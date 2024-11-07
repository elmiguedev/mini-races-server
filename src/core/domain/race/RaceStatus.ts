export const RaceStatsTypes = {
  lobby: "lobby",
  countdown: "countdown",
  running: "running",
  finished: "finished",
  ready: "ready",
} as const;

export type RaceStatus = typeof RaceStatsTypes[keyof typeof RaceStatsTypes];