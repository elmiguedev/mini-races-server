import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface PlayerInRaceActionParams {
  userId: number;
}

export class PlayerInRaceAction implements Action<PlayerInRaceActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerInRaceActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const player = race.getPlayerByUserId(params.userId);
    if (!player) {
      throw new Error("Player not found");
    }
    player.setStatus("inRace");
    race.checkPlayersInRace();

    return race.getData();
  }

}
