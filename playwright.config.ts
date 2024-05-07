import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: './tests/e2e/globalSetup.js',
    testDir: './tests/e2e',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:3000',

        extraHTTPHeaders: {
            // Add authorization token to all requests.
            // Assuming personal access token available in the environment.
            Authorization: `token ${process.env.API_TOKEN}`,
        },
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        contextOptions: {
            ignoreHTTPSErrors: true,
        },
    },

    /* Configure projects for major browsers */
    projects: [
        { name: 'setup', testMatch: '**/*.setup.ts', fullyParallel: true },
        {
            name: 'chromium',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Chrome'],
                // Use prepared auth state.
                storageState: 'playwright/.auth/user.json',
                trace: 'on',
                // testIdAttribute: "data-test",
            },
            dependencies: ['setup'],
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: [
        {
            command: 'npm run dev:testmock',
            url: 'http://localhost:3000',
            timeout: 120 * 1000,
            reuseExistingServer: true,
            env: {
                ...process.env,
                NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
                TEST_USERNAME: process.env.TEST_USERNAME || '',
                TEST_PASSWORD: process.env.TEST_PASSWORD || '',
            },
        },
    ],
});
