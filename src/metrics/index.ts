import {
  Registry,
  Counter,
  Histogram,
  collectDefaultMetrics,
} from "prom-client";

export const registry = new Registry();

collectDefaultMetrics({ register: registry });

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests by method, route, and status code",
  labelNames: ["method", "route", "status_code"] as const,
  registers: [registry],
});

export const httpRequestDurationSeconds = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency in seconds",
  labelNames: ["method", "route", "status_code"] as const,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [registry],
});

export const stellarTxDurationSeconds = new Histogram({
  name: "stellar_tx_duration_seconds",
  help: "Stellar contract invocation duration in seconds",
  labelNames: ["method", "status"] as const,
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
  registers: [registry],
});

export const quizSubmissionsTotal = new Counter({
  name: "quiz_submissions_total",
  help: "Total quiz submissions",
  labelNames: ["result"] as const,
  registers: [registry],
});

export const rewardClaimsTotal = new Counter({
  name: "reward_claims_total",
  help: "Total reward claim attempts",
  labelNames: ["status"] as const,
  registers: [registry],
});

export const credentialsMintedTotal = new Counter({
  name: "credentials_minted_total",
  help: "Total on-chain credentials minted",
  registers: [registry],
});
