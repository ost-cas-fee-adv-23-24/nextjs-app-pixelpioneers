import { expect, test } from '@playwright/test';
import { urlTestApp } from '../utils';

// TODO: Need to check why this is not working on GitHub pipeline
test('Check the text content in the home route', async ({ page }) => {
    await page.goto(urlTestApp);

    // Wait for a response from the /api/posts endpoint
    await page.waitForTimeout(5000);

    expect(await page.textContent('body')).toContain('claudio');
    expect(await page.textContent('body')).toContain('hello from API 2');
});
