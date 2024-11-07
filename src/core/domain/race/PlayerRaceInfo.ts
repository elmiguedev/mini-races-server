import type { Position } from "./Position";

export interface PlayerRaceInfo {
  position: Position;
  acceleration: number;
  velocity: number;
  angle: number;
  racePosition: number;
  currentCheckpoint: number;
  currentCheckpointTime: number;
  currentLap: number;
  currentLapTime: number;
  bestLapTime: number;
}