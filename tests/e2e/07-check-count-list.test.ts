import { expect, test } from '@playwright/test';

test.describe('should have the list of 18 posts ', () => {
    test('should have 18 posts ', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const testPostMessage = await page.$$('[data-testid="testPostMessage"]');

        expect(testPostMessage.length).toBe(18);
    });
});
