import { expect, test } from '@playwright/test';

// TODO: Need to check why this is not working
test.describe('should have the list of posts and jump to reply detail of any specific post ', () => {
    test('should jump to the detail reply page ', async ({ page }) => {
        await page.goto('/');

        await page.waitForSelector('[name="comment-button"]', { timeout: 5000 });

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[14].click();
        } else {
            console.info('Less than 2 Comment Button found!');
        }

        // await page.waitForLoadState('networkidle');
        await page.waitForTimeout(10000);
        await expect(page.getByText('Wau Wau')).toBeVisible({ timeout: 5000 });
    });
});
