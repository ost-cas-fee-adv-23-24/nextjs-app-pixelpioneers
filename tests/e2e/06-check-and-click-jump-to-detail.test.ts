import { expect, test } from '@playwright/test';

test.describe('should have the list of posts and jump to reply detail of any specific post ', () => {
    test('should jump to the detail reply page ', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByText('Wau Wau')).toBeVisible();

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[14].click();
        } else {
            console.info('Less than 2 Comment Button found!');
        }

        await expect(page.getByText('Wau Wau')).toBeVisible({ timeout: 5000 });
    });
});
