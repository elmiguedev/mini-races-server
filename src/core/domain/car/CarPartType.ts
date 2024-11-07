export const CarPartTypes = {
  body: "body",
  engine: "engine",
  spoiler: "spoiler",
  wheels: "wheels",
} as const;

export type CarPartType = typeof CarPartTypes[keyof typeof CarPartTypes];
