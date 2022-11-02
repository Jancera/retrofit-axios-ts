/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["fixtures", "testSetupFile", "server"],
  setupFilesAfterEnv: ["./test/testSetupFile.js"],
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  rootDir: ".",
  coverageReporters: ["json-summary", "text", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/test/fixture/"],
};
