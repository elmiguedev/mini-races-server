import { RaceEntity } from "../../entities/RaceEntity";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";


export class CreateRaceAction implements Action<void, RaceEntity> {

  constructor(private readonly raceRepository: RaceRepository) {
  }

  public async execute(): Promise<RaceEntity> {
    const race = await this.raceRepository.create();
    return race;
  }


}