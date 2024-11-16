import Elysia, { type Context, type InferContext, type InputSchema, type MergeSchema, type TSchema, type UnwrapRoute } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import type { Server } from "bun";
import { CloseConnectionHandler } from "./handlers/racegame/CloseConnectionHandler";
import { OpenConnectionHandler } from "./handlers/racegame/OpenConnectionHandler";
import { MessageHandlerStrategy } from "./handlers/racegame/MessageHandlerStrategy";

const RaceGameController
  = (actions: Actions) => {
    let server: Server | null = null;
    let context: Context | null = null;
    const sockets: any = {};

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
          await OpenConnectionHandler({
            ws,
            actions,
            context,
            sockets,
            room: ws.data.params.id,
          })
        },

        async close(ws) {
          await CloseConnectionHandler({
            ws,
            actions,
            context,
            sockets,
            room: ws.data.params.id,
          });
        },

        async message(ws, data: any) {
          await MessageHandlerStrategy({
            ws,
            actions,
            context,
            sockets,
            room: ws.data.params.id,
            message: data
          });
        }
      });

    return controller;
  }

export default RaceGameController;