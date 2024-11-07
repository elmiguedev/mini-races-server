import { RaceEntity } from "../../entities/RaceEntity";
import type { RaceRepository } from "./RaceRepository";

export class InMemoryRaceRepository implements RaceRepository {

  private races: Record<string, RaceEntity> = {};

  public create(): Promise<RaceEntity> {
    const race = new RaceEntity();
    this.races[race.getId()] = race;
    return Promise.resolve(race);
  }

  public getById(id: string): Promise<RaceEntity | undefined> {
    return Promise.resolve(this.races[id]);
  }

  public getByUserId(userId: number): Promise<RaceEntity | undefined> {
    const races = Object.values(this.races);
    return Promise.resolve(races.find(race => race.hasUserId(userId)));
  }

  public getAll(): Promise<RaceEntity[]> {
    return Promise.resolve(Object.values(this.races));
  }

  public deleteRace(id: string): Promise<RaceEntity> {
    const race = this.races[id];
    delete this.races[id];
    return Promise.resolve(race);
  }


}