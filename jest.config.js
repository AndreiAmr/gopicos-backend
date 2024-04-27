/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
  },
  setupFiles: ['./jest.setup.js'],
};
