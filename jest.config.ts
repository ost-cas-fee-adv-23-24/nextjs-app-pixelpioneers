import * as Config from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

const jestConfig: typeof Config = {
    preset: 'ts-jest',
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    verbose: true,
    transformIgnorePatterns: ['./node_modules/'],
    projects: ['./jest-eslint.config.ts', './jest-test.config.ts'],
};

export default createJestConfig(jestConfig);
