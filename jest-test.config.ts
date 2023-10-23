import * as Config from '@jest/types';

const jestTestConfig: typeof Config = {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    //transformIgnorePatterns: ['./node_modules/'],
    displayName: 'test',
    testEnvironment: 'jest-environment-jsdom',
};

export default jestTestConfig;
