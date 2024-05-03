import { expect, test } from '@playwright/test';

test.describe('should open the browser with the start route and interactive with login button ', () => {
    test('should use the mocks server for API calls ', async ({ page }) => {
        await page.goto('/');

        // Listen for all network requests
        page.route('**/*', (route) => {
            console.info('Request URL:', route.request().url());
            route.continue();
        });

        await page.goto('/');
    });

    test('should have a specific info text existed without logged in ', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('p');
        expect(welcomeText).toBe('um einen Post zu verfassen.');
    });

    // TODO: Need to check how to solve with login
    test.skip('should have logged in with help of ingclick the login button ', async ({ page }) => {
        await page.goto('/');

        await page.click('button >> text=Log in');

        if (!process.env.TEST_ZITADEL_USER || !process.env.TEST_ZITADEL_PASSWORD) {
            throw new Error('Environment variables are missing for TEST');
        }

        await page.locator('#loginName').fill(process.env.TEST_ZITADEL_USER);
        await page.locator('#submit-button').click();
        await page.locator('#password').fill(process.env.TEST_ZITADEL_PASSWORD);
        await page.locator('#submit-button').click();

        await page.goto('/');
        await expect(page).toHaveURL('http://localhost:3000');

        // Check if the element textarea exists (after logged in)
        const textArea = await page.waitForSelector('#test');
        console.info(textArea);

        expect(textArea).toBeNull;
    });
});
