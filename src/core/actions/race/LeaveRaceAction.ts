import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface LeaveRaceActionParams {
  userId: number;
}

export class LeaveRaceAction implements Action<LeaveRaceActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository,
  ) { }

  public async execute(params: LeaveRaceActionParams): Promise<RaceData> {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }

    race.removePlayerByUserId(params.userId);

    if (race.getPlayersCount() === 0) {
      await this.raceRepository.deleteRace(race.getId());
    }

    return race.getData();
  }
}