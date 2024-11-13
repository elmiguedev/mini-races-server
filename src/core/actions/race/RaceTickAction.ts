import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface RaceTickActionParams {
  raceId: string;
}

export class RaceTickAction implements Action<RaceTickActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: RaceTickActionParams) {
    const race = await this.raceRepository.getById(params.raceId);
    if (!race) {
      throw new Error("Race not found");
    }

    race.iterate();

    return race.getData();
  }

}
