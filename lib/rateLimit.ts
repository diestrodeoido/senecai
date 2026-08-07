// In-memory sliding-window rate limiter.
//
// Limitation: state lives per serverless-function instance. On Vercel this
// throttles a warm instance getting hammered by the same IP, but a cold start
// resets the map and concurrent instances/regions don't share state — it stops
// casual spam, not a distributed attack. If real abuse shows up, the next step
// is @upstash/ratelimit backed by a Redis instance (needs an external signup,
// intentionally not set up here).

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - timestamps[0])) / 1000);
    hits.set(key, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true };
}
