import type { ChatMessage } from "./ChatMessage";
import type { Checkpoint } from "./Checkpoint";
import type { PlayerData } from "./PlayerData";
import type { RaceStatus } from "./RaceStatus";

export interface RaceData {
  id: string;
  maxPlayers: number;
  players: Record<string, PlayerData>;
  createdAt: Date;
  status: RaceStatus;
  chats: ChatMessage[];
  checkpoints: Checkpoint[];
}