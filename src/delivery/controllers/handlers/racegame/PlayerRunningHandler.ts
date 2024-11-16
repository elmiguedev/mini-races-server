
import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const PlayerRunningHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;

  const raceStatus = await actions.playerRunningAction.execute({
    userId: sockets[ws.id].user.id
  });

  const socketMessage = {
    key: SocketMessageKeys.RACE_STATUS,
    data: raceStatus
  }

  ws.publish(room, socketMessage);
  ws.send(socketMessage);

  if (raceStatus.status === "running") {
    await actions.startRaceAction.execute({
      raceId: room,
      statusCallback: (raceStatus) => {
        const socketMessage = {
          key: SocketMessageKeys.RACE_STATUS,
          data: raceStatus
        }
        ws.publish(room, socketMessage);
        ws.send(socketMessage);
      }
    });
  }
}
