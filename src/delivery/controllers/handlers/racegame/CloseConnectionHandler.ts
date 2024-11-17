import { escapeHTML } from "bun";
import { RaceNotFoundError } from "../../../../core/errors/race/RaceNotFoundError";
import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const CloseConnectionHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;

  try {
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
  } catch (error) {
    if (error instanceof RaceNotFoundError) {
      ws.send({
        key: SocketMessageKeys.ERROR,
        data: {
          code: 404,
          status: "race_not_found"
        }
      })
    } else {
      ws.send({
        key: SocketMessageKeys.ERROR,
        data: {
          code: 500,
          status: "internal_server_error"
        }
      })
    }
    ws.close();
  }

}