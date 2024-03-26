import * as Config from '@jest/types';

const jestEslintConfig: typeof Config = {
    runner: 'jest-runner-eslint',
    displayName: 'lint',
};

export default jestEslintConfig;
