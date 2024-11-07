export const PlayerStatusTypes = {
  lobby: "lobby",
  countdown: "countdown",
  running: "running",
  finished: "finished",
  ready: "ready",
  inRace: "inRace",
} as const;

export type PlayerStatus = typeof PlayerStatusTypes[keyof typeof PlayerStatusTypes];