import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
