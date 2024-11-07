import Elysia, { type InputSchema, type MergeSchema, type TSchema, type UnwrapRoute } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import type { Server, ServerWebSocket } from "bun";
import type { TypeCheck } from "elysia/type-system";
import type { ElysiaWS } from "elysia/ws";

type ElysiaWsType = ElysiaWS<ServerWebSocket<{ validator?: TypeCheck<TSchema>; }>, MergeSchema<UnwrapRoute<InputSchema<never>, {}>, {}> & { params: Record<"id", string>; }, { decorator: {}; store: {}; derive: {}; resolve: {}; } & { derive: {}; resolve: {}; }>;

const RaceGameController
  = (actions: Actions) => {
    let server: Server | null = null;

    // handler methods
    const openConnectionHandler = (ws: ElysiaWsType) => {

    }

    // controller instance
    const controller = new Elysia()
      .onBeforeHandle((ctx) => {
        if (!server) {
          server = ctx.server
        }
      })
      .ws("/races/:id", {
        open(ws) {
          console.log("## socket conectado - sala:", ws.data.params.id);
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
          console.log(">> el controler.server", server);
          server?.publish(roomName, "usuario desconectado");
        },

        message(ws, data: any) {
          const roomId = ws.data.params.id;
          const roomName = "room-" + roomId;
          console.log(`(${ws.data.params.id}) ## ${data.key}: ${data.data} (socket id: ${ws.id})`);
          ws.publish(roomName, data);
          ws.send(data);
        }
      });

    return controller;
  }

export default RaceGameController
  ;