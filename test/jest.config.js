const config = {
  testTimeout: 1000000,
  testEnvironment: "node",
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "./coverage",
  reporters: ["default", "jest-junit"],
  testResultsProcessor: "jest-sonar-reporter",
};

module.exports = config;
