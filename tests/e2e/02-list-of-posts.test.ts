import { expect, test } from '@playwright/test';

test.describe('should received mock data from API of Server Mocks and filled them in web app ', () => {
    test('should have the text existed in web app content of the home route ', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(5000);

        expect(await page.textContent('body')).toContain('claudio');
        expect(await page.textContent('body')).toContain('hello from API 2');
    });
});
