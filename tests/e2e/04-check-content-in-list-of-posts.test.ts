import { expect, test } from '@playwright/test';

// TODO: Need to check why this is not working on GitHub pipeline
test.describe('should open the browser with body data from Server Mocks API ', () => {
    test.skip('should have the existed text in body content of the home route ', async ({
        page,
    }) => {
        await page.goto('/');
        await page.waitForTimeout(5000);

        expect(await page.textContent('body')).toContain('claudio');
        expect(await page.textContent('body')).toContain('hello from API 2');
    });
});
