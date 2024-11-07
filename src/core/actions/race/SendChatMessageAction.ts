import type { ChatMessage } from "../../domain/race/ChatMessage";
import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface SendChatMessageActionParams {
  socketId: string;
  message: string;
  userId: number;
}
export class SendChatMessageAction implements Action<SendChatMessageActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: SendChatMessageActionParams): Promise<RaceData> {
    const race = await this.raceRepository.getByUserId(params.userId);

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

    return race.getData();
  }
}