import { expect, test } from '@playwright/test';
import { urlTestApp } from '../utils';

test('Check the text content in the home route', async ({ page }) => {
    await page.goto(urlTestApp);

    expect(await page.textContent('body')).toContain('claudio');
    expect(await page.textContent('body')).toContain('hello from API 2');
});
