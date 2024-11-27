import type { PlayerData } from "../../domain/race/PlayerData";
import type { RaceRepository } from "../../repositories/races/RaceRepository";
import type { Action } from "../Action";

export interface PlayerMoveActionParams {
  userId: number;
  accelerate?: boolean;
  left?: boolean;
  right?: boolean;
}

export class PlayerMoveAction implements Action<PlayerMoveActionParams, PlayerData> {

  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerMoveActionParams) {
    // TODO: improve to get race from socketid 
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }

    const player = race.getPlayerByUserId(params.userId);
    if (!player) {
      throw new Error("Player not found");
    }


    player.addMove(params);
    // if (params.left) {
    //   player.turnLeft();
    // }

    // if (params.right) {
    //   player.turnRight();
    // }

    // if (params.accelerate) {
    //   player.accelerate();
    // }


    return player.getData();
  }
}