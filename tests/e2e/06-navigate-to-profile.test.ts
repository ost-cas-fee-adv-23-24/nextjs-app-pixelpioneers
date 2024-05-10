import { expect, test } from '@playwright/test';

test.describe('should have a profile route navigated ', () => {
    test('should have a profile page opened ', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const naviUserButton = await page.$$('[data-testid="testNaviUserButton"]');
        if (naviUserButton.length === 1) {
            await naviUserButton[0].click();
        }

        await page.waitForTimeout(4000);
        await expect(page.getByText('andre')).toBeTruthy();
    });
});
