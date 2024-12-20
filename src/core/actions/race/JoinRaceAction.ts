import type { RaceData } from "../../domain/race/RaceData";
import { RaceNotFoundError } from "../../errors/race/RaceNotFoundError";
import { UserNotFoundError } from "../../errors/user/UserNotFoundError";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export interface JoinRaceActionParams {
  userId: number;
  raceId: string;
  socketId: string;
}

export class JoinRaceAction implements Action<JoinRaceActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository,
    private readonly userRepository: UserRepository
  ) { }

  public async execute(params: JoinRaceActionParams): Promise<RaceData> {

    const race = await this.raceRepository.getById(params.raceId);
    const user = await this.userRepository.findById(params.userId);

    if (!race) {
      throw new RaceNotFoundError();
    }

    if (!user) {
      throw new UserNotFoundError();
    }

    race.addPlayer(
      params.socketId,
      user
    )

    return race.getData();
  }


}
