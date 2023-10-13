import * as Config from '@jest/types';

const jestTestConfig: typeof Config = {
    setupFilesAfterEnv: ['./jest.setup.js'],
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    displayName: 'test',
};

export default jestTestConfig;
