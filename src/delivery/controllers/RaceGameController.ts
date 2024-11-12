import Elysia, { type Context, type InputSchema, type MergeSchema, type TSchema, type UnwrapRoute } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import type { Server, ServerWebSocket } from "bun";
import type { TypeCheck } from "elysia/type-system";
import type { ElysiaWS } from "elysia/ws";
import jwt from "@elysiajs/jwt";
import Authorization from "../middlewares/Authorization";

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

    const messageHandler = (ws: ElysiaWsType, room: string, data: any) => {
      if (!data.key || !data.data) {
        return;
      }

      switch (data.key) {
        case "chat":
          ws.publish(room, data);
          ws.send(data);
          break;
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

          const roomId = ws.data.params.id;
          const roomName = "room-" + roomId;

          ws.subscribe(roomName);
          ws.publish(roomName, "usuario conectado");
        },

        close(ws) {
          console.log("## socket desconectado - sala:", ws.data.params.id);
          const roomId = ws.data.params.id;
          const roomName = "room-" + roomId;
          ws.unsubscribe(roomName);
          server?.publish(roomName, "usuario desconectado");
          delete sockets[ws.id];
        },

        message(ws, data: any) {
          const roomId = ws.data.params.id;
          const roomName = "room-" + roomId;
          console.log(`(${sockets[ws.id].user.name}) ## ${data.key}: ${data.data} (socket id: ${ws.id})`);
          messageHandler(ws, roomName, data);
        }
      });

    return controller;
  }

export default RaceGameController
  ;