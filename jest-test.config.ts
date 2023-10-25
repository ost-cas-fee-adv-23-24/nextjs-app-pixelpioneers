import * as Config from '@jest/types';

const jestTestConfig: typeof Config = {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    displayName: 'test',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {},
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.jest.json',
            },
        ],
    },
};

export default jestTestConfig;
