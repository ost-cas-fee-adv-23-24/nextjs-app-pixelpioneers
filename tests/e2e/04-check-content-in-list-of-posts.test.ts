import { expect, test } from '@playwright/test';

test('Check the text content in the home route', async ({ page }) => {
    await page.goto('http://localhost:3000');

    expect(await page.textContent('body')).toContain('claudio');
    expect(await page.textContent('body')).toContain('hello from API 2');
});
