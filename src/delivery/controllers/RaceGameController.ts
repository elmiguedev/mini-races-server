import Elysia, { type Context, type InputSchema, type MergeSchema, type TSchema, type UnwrapRoute } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import type { Server, ServerWebSocket } from "bun";
import type { TypeCheck } from "elysia/type-system";
import type { ElysiaWS } from "elysia/ws";

type ElysiaWsType = ElysiaWS<ServerWebSocket<{ validator?: TypeCheck<TSchema>; }>, MergeSchema<UnwrapRoute<InputSchema<never>, {}>, {}> & { params: Record<"id", string>; }, { decorator: {}; store: {}; derive: {}; resolve: {}; } & { derive: {}; resolve: {}; }>;

interface SocketMessage {
  key: string;
  data: any;
}

const RaceGameController
  = (actions: Actions) => {
    let server: Server | null = null;
    let context: Context | null = null;
    const sockets: any = {};

    // handler methods
    const openConnectionHandler = (ws: ElysiaWsType) => {

    }

    const messageHandler = async (ws: ElysiaWsType, room: string, data: any) => {
      if (!data.key || !data.data) {
        return;
      }

      switch (data.key) {
        case "player_chat":
          const chatMessage = await actions.sendChatMessageAction.execute({
            message: data.data.message,
            raceId: room,
            socketId: ws.id
          });

          const socketMessage = {
            key: "player_chat",
            data: chatMessage
          };

          ws.publish(room, socketMessage);
          ws.send(socketMessage);
          break;
        case "player_ready": {
          const raceStatus = await actions.playerReadyAction.execute({
            userId: sockets[ws.id].user.id
          });
          const socketMessage = {
            key: "race_status",
            data: raceStatus
          }
          ws.publish(room, socketMessage);
          ws.send(socketMessage);
          break;
        }

        default:
          console.log("## key not found:", data.key);
          break;
      }
    }

    // controller instance
    const controller = new Elysia()
      .onBeforeHandle((ctx) => {
        if (!server) {
          server = ctx.server
        }
        if (!context) {
          context = ctx

        }
      })
      .ws("/races/:id", {
        async open(ws) {
          console.log("## socket conectado - sala:", ws.data.params.id);
          const token = ws.data.query.token;
          console.log("## token:", token);
          if (!token) {
            ws.close();
            console.log("## socket desconectado por falta de token - sala:", ws.data.params.id);
          }

          // @ts-ignore
          const tokenPayload = await context.jwt.verify(token);
          if (!tokenPayload) {
            ws.close();
            console.log("## socket desconectado por token invalido:", ws.data.params.id);

          } else {
            console.log("## token valido - payload:", tokenPayload);

            sockets[ws.id] = {
              id: ws.id,
              user: tokenPayload
            }

          }

          const raceData = await actions.joinRaceAction.execute({
            raceId: ws.data.params.id,
            userId: tokenPayload.id,
            socketId: ws.id
          })

          const roomId = ws.data.params.id;

          ws.subscribe(roomId);
          ws.publish(roomId, {
            key: "race_status",
            data: raceData
          });
          ws.send({
            key: "race_status",
            data: raceData
          })
        },

        async close(ws) {
          console.log("## socket desconectado - sala:", ws.data.params.id);
          const roomId = ws.data.params.id;
          ws.unsubscribe(roomId);
          const raceData = await actions.leaveRaceAction.execute({
            userId: sockets[ws.id].user.id
          })
          delete sockets[ws.id];
          ws.publish(roomId, {
            key: "race_status",
            data: raceData
          });
        },

        message(ws, data: any) {
          const roomId = ws.data.params.id;
          console.log(`(${sockets[ws.id].user.name}) ## ${data.key}: ${data.data} (socket id: ${ws.id})`);
          messageHandler(ws, roomId, data);
        }
      });

    return controller;
  }

export default RaceGameController
  ;