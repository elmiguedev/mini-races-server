import type { ChatMessage } from "./ChatMessage";
import type { PlayerData } from "./PlayerData";
import type { RaceStatus } from "./RaceStatus";

export interface RaceData {
  id: string;
  maxPlayers: number;
  players: Record<string, PlayerData>;
  createdAt: Date;
  status: RaceStatus;
  chats: ChatMessage[];
}