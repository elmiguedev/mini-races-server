import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const OpenConnectionHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets, context } = params;
  const token = ws.data.query.token;

  console.log("## socket conectado - sala:", room);
  console.log("## token:", token);

  if (!token) {
    ws.close();
    console.log("## socket desconectado por falta de token - sala:", room);
  }

  const tokenPayload = await context.jwt.verify(token);
  if (!tokenPayload) {
    ws.close();
    console.log("## socket desconectado por token invalido:", room);

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
  ws.send({ key: "socket_id", data: ws.id });
  ws.subscribe(roomId);
  ws.publish(roomId, {
    key: "race_status",
    data: raceData
  });
  ws.send({
    key: "race_status",
    data: raceData
  })
}