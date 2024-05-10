import { expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const authFile = 'playwright/.auth/user.json';
const urlRegex =
    /https:\/\/cas-fee-adv-ed1ide\.zitadel\.cloud\/ui\/login\/login\?authRequestID=\d+/;

setup('authenticate', async ({ page }) => {
    setup.slow();
    await page.goto('/');

    await page.click('[data-testid="testLoginButton"]');

    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
        throw new Error('Environment variables are missing for e2e!');
    }

    await page.getByLabel('Login').click();
    await page.waitForURL(urlRegex);
    await page.getByPlaceholder('username@domain').fill(process.env.TEST_USERNAME);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
    await page.getByRole('button', { name: 'Next' }).click();

    await page.goto('/');

    await page.waitForURL('/');
    await page.click('[data-testid="testLoginButton"]');

    await expect(page.locator('[data-testid="testLoginButton"] >> text=Log out')).toBeVisible();
    await page.context().storageState({ path: authFile });
});
