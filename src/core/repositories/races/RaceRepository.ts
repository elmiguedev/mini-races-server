import { RaceEntity } from "../../entities/RaceEntity";

export interface RaceRepository {
  create(): Promise<RaceEntity>;
  getAll(): Promise<RaceEntity[]>;
  getById(id: string): Promise<RaceEntity | undefined>;
  getByUserId(userId: number): Promise<RaceEntity | undefined>;
  deleteRace(id: string): Promise<RaceEntity>;
}