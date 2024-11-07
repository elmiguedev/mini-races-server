import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export class GetRacesAction implements Action<void, RaceData[]> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute() {
    const races = await this.raceRepository.getAll();
    return races.map(race => race.getData());
  }
}