import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const CloseConnectionHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;

  console.log("## socket desconectado - sala:", room);

  ws.unsubscribe(room);

  const raceData = await actions.leaveRaceAction.execute({
    userId: sockets[ws.id].user.id
  })

  delete sockets[ws.id];
  ws.publish(room, {
    key: SocketMessageKeys.RACE_STATUS,
    data: raceData
  });
}