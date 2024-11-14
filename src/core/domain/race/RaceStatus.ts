export const RaceStatsTypes = {
  lobby: "lobby",
  ready: "ready",
  countdown: "countdown",
  running: "running",
  finished: "finished",
} as const;

export type RaceStatus = typeof RaceStatsTypes[keyof typeof RaceStatsTypes];