import * as path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';  
import type { Config } from 'jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.jest.json'),
      },
    ],
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: ['node_modules/(?!(jest-transform-stub)/)'],
};

export default config;
