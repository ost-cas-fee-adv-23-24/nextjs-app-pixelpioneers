import { expect, test } from '@playwright/test';

test('Check the welcome title is not exist', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    const welcomeText = await page.innerText('h2');
    expect(welcomeText).not.toBe('Willkommen auf OST');
});
