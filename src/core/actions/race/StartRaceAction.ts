import type { RaceData } from "../../domain/race/RaceData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface StartRaceActionParams {
  raceId: string;
  statusCallback: (race: RaceData) => void
}
export class StartRaceAction implements Action<StartRaceActionParams, void> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute(input: StartRaceActionParams): Promise<void> {
    const race = await this.raceRepository.getById(input.raceId);
    if (!race) return;
    race.addStatusListener(input.statusCallback);
    race.startRace();
  }
}