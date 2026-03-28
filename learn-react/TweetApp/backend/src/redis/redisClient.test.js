/**
 * @jest-environment node
 */

const mockConnect = jest.fn();
const mockQuit = jest.fn();
const mockOn = jest.fn();

jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    connect: mockConnect,
    on: mockOn,
    get isOpen() {
      return true;
    },
    quit: mockQuit,
  })),
}));

describe("redisClient", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    mockConnect.mockResolvedValue(undefined);
    mockQuit.mockResolvedValue(undefined);
    process.env = { ...OLD_ENV };
    delete process.env.REDIS_URL;
    delete process.env.REDIS_HOST;
    delete process.env.REDIS_ENABLED;
    delete process.env.REDIS_PASSWORD;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("does not connect when Redis is not configured", async () => {
    process.env.REDIS_ENABLED = "false";
    const { connectRedis, getRedisClient, isRedisConfigured } = require("./redisClient");
    expect(isRedisConfigured()).toBe(false);
    const c = await connectRedis();
    expect(c).toBeNull();
    expect(getRedisClient()).toBeNull();
    expect(require("redis").createClient).not.toHaveBeenCalled();
  });

  it("connects when REDIS_URL is set", async () => {
    process.env.REDIS_URL = "redis://127.0.0.1:6379";
    const { connectRedis, getRedisClient, isRedisConfigured } = require("./redisClient");
    expect(isRedisConfigured()).toBe(true);
    await connectRedis();
    expect(require("redis").createClient).toHaveBeenCalled();
    expect(getRedisClient()).not.toBeNull();
  });
});
