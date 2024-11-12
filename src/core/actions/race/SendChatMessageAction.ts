import type { ChatMessage } from "../../domain/race/ChatMessage";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface SendChatMessageActionParams {
  raceId: string;
  socketId: string;
  message: string;
}
export class SendChatMessageAction implements Action<SendChatMessageActionParams, ChatMessage> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: SendChatMessageActionParams): Promise<ChatMessage> {
    const race = await this.raceRepository.getById(params.raceId);
    if (!race) {
      throw new Error("Race not found");
    }

    const player = race.getPlayerBySocketId(params.socketId);
    if (!player) {
      throw new Error("Player not found");
    }

    const chatMessage: ChatMessage = {
      name: player.getData().name,
      message: params.message
    }

    race.addChatMessage(chatMessage);

    return chatMessage;
  }
}