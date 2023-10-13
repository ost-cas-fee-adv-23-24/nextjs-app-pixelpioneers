// eslint-disable-next-line @typescript-eslint/no-var-requires
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    //moduleFileExtensions: ['js', 'ts', 'tsx'],
    //moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/tests/unit/**/*.ts?(x)', '**/tests/snapshot/**/*.ts?(x)'],
    verbose: true,
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    // Jest Runner Lint
    runner: 'jest-runner-eslint',
    displayName: 'lint',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
