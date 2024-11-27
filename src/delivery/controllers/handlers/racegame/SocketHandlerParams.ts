import type { Context } from "elysia";
import type { Actions } from "../../../providers/ActionProvider";
import type { ElysiaWsInstance } from "../../../utils/ElysiaWsInstance";
import type { SocketMessage } from "../../../utils/SocketMessage";

export interface SocketHandlerParams {
  actions: Actions;
  ws: ElysiaWsInstance;
  context: any;
  sockets: Record<string, any>;
  room: string;
  message?: SocketMessage;

}