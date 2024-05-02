import { expect, test } from '@playwright/test';

test('Check the correct welcome title', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    const welcomeText = await page.innerText('h2');
    expect(welcomeText).toBe('Willkommen auf Mumble');
});
