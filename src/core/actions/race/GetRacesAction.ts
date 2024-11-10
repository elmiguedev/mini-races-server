import type { Race } from "../../domain/race/Race";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export class GetRacesAction implements Action<void, Race[]> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute(): Promise<Race[]> {
    const races = await this.raceRepository.getAll();
    return races.map(race => {
      const raceData = race.getData();
      return {
        createdAt: raceData.createdAt,
        id: raceData.id,
        maxPlayers: raceData.maxPlayers,
        playersCount: Object.keys(raceData.players).length,
        status: raceData.status
      }
    });
  }
}