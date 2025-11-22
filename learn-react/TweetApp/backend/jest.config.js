/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.js", "**/*.test.js", "**/*.spec.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!**/node_modules/**",
    "!**/swagger*.js",
    "!**/*dto*.js",
    "!**/*model*.js",
    "!**/*schema*.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "text-summary", "lcov"],
  verbose: true,
};
