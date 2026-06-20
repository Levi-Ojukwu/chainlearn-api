import type { FastifyRateLimitOptions } from "@fastify/rate-limit";
import type { FastifyRequest } from "fastify";
import { config } from "../config/index.js";

export function rateLimitOptions(): FastifyRateLimitOptions {
  return {
    max: config.RATE_LIMIT_MAX,
    timeWindow: config.RATE_LIMIT_WINDOW_MS,
    keyGenerator: (request: FastifyRequest) => {
      // Prefer authenticated user id, fall back to IP
      const authReq = request as any;
      return authReq.authUser?.id ?? request.ip;
    },
    errorResponseBuilder: (_request: FastifyRequest, context: { after: number }) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Rate limit exceeded. Retry after ${context.after}ms.`,
    }),
  };
}
