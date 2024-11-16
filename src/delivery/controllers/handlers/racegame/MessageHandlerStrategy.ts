import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import { PlayerChatHandler } from "./PlayerChatHandler";
import { PlayerInRaceHandler } from "./PlayerInRaceHandler";
import { PlayerMoveHandler } from "./PlayerMoveHandler";
import { PlayerReadyHandler } from "./PlayerReadyHandler";
import { PlayerRunningHandler } from "./PlayerRunningHandler";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const MessageHandlerStrategy = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;

  if (!message || !message.key || !message.data) {
    return;
  }

  switch (message.key) {
    case SocketMessageKeys.PLAYER_CHAT: PlayerChatHandler(params); break;
    case SocketMessageKeys.PLAYER_READY: PlayerReadyHandler(params); break;
    case SocketMessageKeys.PLAYER_IN_RACE: PlayerInRaceHandler(params); break;
    case SocketMessageKeys.PLAYER_RUNNING: PlayerRunningHandler(params); break;
    case SocketMessageKeys.PLAYER_MOVE: PlayerMoveHandler(params); break;

    default:
      console.log("## key not found:", message.key);
      break;
  }
}