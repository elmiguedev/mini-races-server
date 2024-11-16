import { SocketMessageKeys } from "../../../utils/SocketMessageKeys";
import type { SocketHandlerParams } from "./SocketHandlerParams";

export const PlayerChatHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message } = params;

  if (!message) {
    return;
  }

  const chatMessage = await actions.sendChatMessageAction.execute({
    message: message.data.message,
    raceId: room,
    socketId: ws.id
  });

  const socketMessage = {
    key: SocketMessageKeys.PLAYER_CHAT,
    data: chatMessage
  };

  ws.publish(room, socketMessage);
  ws.send(socketMessage);
}