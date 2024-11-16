
import type { SocketHandlerParams } from "./SocketHandlerParams";


export const PlayerMoveHandler = async (params: SocketHandlerParams) => {
  const { actions, ws, room, message, sockets } = params;
  if (!message) {
    return;
  }

  console.log("## player_move", message.data);
  await actions.playerMoveAction.execute({
    userId: sockets[ws.id].user.id,
    accelerate: message.data.accelerate,
    left: message.data.left,
    right: message.data.right
  });

}