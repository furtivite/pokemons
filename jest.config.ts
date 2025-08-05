import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@store$': '<rootDir>/src/store',
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