//import type { Config } from '@jest/types';
import * as Config from '@jest/types';

const jestConfig: typeof Config = {
    preset: 'ts-jest',
    //moduleFileExtensions: ['js', 'ts', 'tsx'],
    //moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    verbose: true,
    transformIgnorePatterns: ['./node_modules/'],
    projects: ['./jest-eslint.config.ts', './jest-test.config.ts'],
};

export default jestConfig;
