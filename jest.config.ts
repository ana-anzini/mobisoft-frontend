export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageReporters: [
    "lcov",       // Adiciona o lcov como formato de cobertura
    "text-summary" // Resumo de cobertura no terminal
  ],

  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Asegura que todos os arquivos de código dentro de src sejam cobertos
  ],

  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  setupFilesAfterEnv: ['./jest.setup.js'],

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};