import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export class GetRaceAction implements Action<string, RaceData | undefined> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute(id: string) {
    const race = await this.raceRepository.getById(id);
    return race?.getData();
  }
}