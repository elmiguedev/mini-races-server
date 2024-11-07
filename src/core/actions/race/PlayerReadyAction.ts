import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface PlayerReadyActionParams {
  userId: number;
}

export class PlayerReadyAction implements Action<PlayerReadyActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerReadyActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const user = await race.getPlayerByUserId(params.userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.setStatus("ready");
    race.checkPlayersReady();

    return race.getData();
  }

}
