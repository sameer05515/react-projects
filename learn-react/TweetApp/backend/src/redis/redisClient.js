/**
 * Optional Redis client for caching, sessions, or pub/sub.
 *
 * Enable with any of:
 *   REDIS_URL=redis://127.0.0.1:6379
 *   REDIS_HOST=127.0.0.1  (optional REDIS_PORT, default 6379; REDIS_PASSWORD; REDIS_DB)
 *   REDIS_ENABLED=true    (uses localhost:6379 if URL/host not set)
 *
 * Disable explicitly:
 *   REDIS_ENABLED=false
 */

const { createClient } = require("redis");

/** @type {import('redis').RedisClientType | null} */
let client = null;

/** @type {Promise<import('redis').RedisClientType | null> | null} */
let connecting = null;

function isRedisConfigured() {
  if (process.env.REDIS_ENABLED === "false") {
    return false;
  }
  const url = process.env.REDIS_URL?.trim();
  const host = process.env.REDIS_HOST?.trim();
  if (url || host) {
    return true;
  }
  return process.env.REDIS_ENABLED === "true";
}

function buildUrlFromEnv() {
  const password = process.env.REDIS_PASSWORD;
  const host = process.env.REDIS_HOST || "127.0.0.1";
  const port = process.env.REDIS_PORT || "6379";
  const db = process.env.REDIS_DB ?? "0";
  if (password) {
    const user = process.env.REDIS_USERNAME?.trim();
    if (user) {
      return `redis://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${db}`;
    }
    return `redis://:${encodeURIComponent(password)}@${host}:${port}/${db}`;
  }
  return `redis://${host}:${port}/${db}`;
}

/**
 * Connects to Redis if configured. Safe to call multiple times.
 * On failure, logs and returns null (server may still run without Redis).
 * @returns {Promise<import('redis').RedisClientType | null>}
 */
async function connectRedis() {
  if (!isRedisConfigured()) {
    console.log(
      "[Redis] Disabled — set REDIS_URL, REDIS_HOST, or REDIS_ENABLED=true in .env (topic cache will not run)"
    );
    return null;
  }

  if (client?.isOpen) {
    return client;
  }
  if (connecting) {
    return connecting;
  }

  const url = process.env.REDIS_URL?.trim() || buildUrlFromEnv();

  client = createClient({
    url,
    socket: {
      reconnectStrategy: retries => {
        if (retries > 10) {
          return new Error("[Redis] Too many reconnection attempts");
        }
        return Math.min(retries * 100, 3_000);
      },
    },
  });

  client.on("error", err => {
    console.error("[Redis]", err.message);
  });

  connecting = client
    .connect()
    .then(() => {
      console.log(`[Redis] Connected (${url.replace(/:[^:@/]+@/, ":****@")})`);
      return client;
    })
    .catch(err => {
      console.error("[Redis] Initial connection failed:", err.message);
      client = null;
      return null;
    })
    .finally(() => {
      connecting = null;
    });

  return connecting;
}

/**
 * @returns {import('redis').RedisClientType | null} Connected client, or null if disabled / failed.
 */
function getRedisClient() {
  return client?.isOpen ? client : null;
}

function isRedisReady() {
  return Boolean(client?.isOpen);
}

async function quitRedis() {
  if (!client?.isOpen) {
    return;
  }
  try {
    await client.quit();
    console.log("[Redis] Connection closed");
  } catch (err) {
    console.error("[Redis] Error while quitting:", err.message);
  } finally {
    client = null;
  }
}

module.exports = {
  isRedisConfigured,
  connectRedis,
  getRedisClient,
  isRedisReady,
  quitRedis,
};
