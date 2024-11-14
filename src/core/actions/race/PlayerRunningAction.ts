import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface PlayerRunningActionParams {
  userId: number;
}

export class PlayerRunningAction implements Action<PlayerRunningActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerRunningActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const player = race.getPlayerByUserId(params.userId);
    if (!player) {
      throw new Error("Player not found");
    }
    player.setStatus("running");
    race.checkPlayersRunning();

    return race.getData();
  }

}
