module.exports = {
  roots: [""],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  modulePathIgnorePatterns: ["fixtures", "testSetupFile", "server"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  testEnvironment: "node",
  rootDir: ".",
  setupFilesAfterEnv: ["./test/testSetupFile.js"],
  coverageReporters: ["json-summary", "text", "lcov"],
};
