import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',

  roots: ['<rootDir>/src'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-loading-skeleton)/)'
  ],

  moduleNameMapper: {
    '^@api/pokemonApi$': '<rootDir>/__mocks__/@api/pokemonApi.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@store$': '<rootDir>/src/store',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],

  testPathIgnorePatterns: ['/node_modules/'],
};

export default config;