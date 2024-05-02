import { expect, test } from '@playwright/test';
import { urlTestApp } from '../utils';

test('Check the correct welcome title', async ({ page }) => {
    await page.goto(urlTestApp);

    const welcomeText = await page.innerText('h2');
    expect(welcomeText).toBe('Willkommen auf Mumble');
});
