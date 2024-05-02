import { expect, test } from '@playwright/test';
import { urlTestApp } from '../utils';

test('Check the welcome title is not exist', async ({ page }) => {
    await page.goto(urlTestApp);

    const welcomeText = await page.innerText('h2');
    expect(welcomeText).not.toBe('Willkommen auf OST');
});
