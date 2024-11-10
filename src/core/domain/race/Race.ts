import type { RaceStatus } from "./RaceStatus";

export interface Race {
  id: string;
  maxPlayers: number;
  playersCount: number;
  createdAt: Date;
  status: RaceStatus;
}