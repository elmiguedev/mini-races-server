import type { Car } from "../car/Car";
import type { User } from "../user/User";
import type { PlayerRaceInfo } from "./PlayerRaceInfo";
import type { PlayerStatus } from "./PlayerStatus";

export interface PlayerData {
  socketId: string;
  status: PlayerStatus;
  name: string;
  playerRaceInfo: PlayerRaceInfo;
}