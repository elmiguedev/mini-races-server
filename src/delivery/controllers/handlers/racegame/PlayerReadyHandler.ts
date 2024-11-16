import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const PlayerReadyHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;

  const raceStatus = await actions.playerReadyAction.execute({
    userId: sockets[ws.id].user.id
  });

  const socketMessage = {
    key: SocketMessageKeys.RACE_STATUS,
    data: raceStatus
  }
  ws.publish(room, socketMessage);
  ws.send(socketMessage);
}