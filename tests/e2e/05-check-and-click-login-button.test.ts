import { expect, test } from '@playwright/test';

test('should use the mocks server for API calls', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Listen for all network requests
    page.route('**/*', (route) => {
        console.info('Request URL:', route.request().url());
        route.continue();
    });

    // This will go to 'http://localhost:3000'
    await page.goto('http://localhost:3000');
});

test('Check there is a specific info text existed with no logged in ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('um einen Post zu verfassen.');
});

// TODO: Need to check how to solve with login
test.only('should click the login button ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    await page.click('button >> text=Log in');

    if (!process.env.TEST_ZITADEL_USER || !process.env.TEST_ZITADEL_PASSWORD) {
        throw new Error('Environment variables are missing for TEST');
    }

    await page.locator('#loginName').fill(process.env.TEST_ZITADEL_USER);
    await page.locator('#submit-button').click();
    await page.locator('#password').fill(process.env.TEST_ZITADEL_PASSWORD);
    await page.locator('#submit-button').click();

    await page.goto('http://localhost:3000`');
    await expect(page).toHaveURL('http://localhost:3000');

    // Check if the element textarea exists (after logged in)
    const textArea = await page.waitForSelector('#test');
    console.info(textArea);

    expect(textArea).toBeNull;
});
