import type { ServerWebSocket } from "bun";
import type { InputSchema, MergeSchema, TSchema, UnwrapRoute } from "elysia";
import type { TypeCheck } from "elysia/type-system";
import type { ElysiaWS } from "elysia/ws";

export type ElysiaWsInstance = ElysiaWS<ServerWebSocket<{ validator?: TypeCheck<TSchema>; }>, MergeSchema<UnwrapRoute<InputSchema<never>, {}>, {}> & { params: Record<"id", string>; }, { decorator: {}; store: {}; derive: {}; resolve: {}; } & { derive: {}; resolve: {}; }>;
