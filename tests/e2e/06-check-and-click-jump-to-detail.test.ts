import { expect, test } from '@playwright/test';

// TODO: Need to invest about jumping from list to view
test.describe('should have the list of posts and jump to reply detail of any specific post ', () => {
    test('should jump to the detail reply page ', async ({ page }) => {
        await page.goto('/');

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[14].click();
        } else {
            console.info('Less than 2 Comment Button found!');
        }

        await page.waitForURL('http://localhost:3000/post/01HVTHCF8B2KHT0FBG04QAGTHR');
        await expect(page).toHaveURL('http://localhost:3000/post/01HVTHCF8B2KHT0FBG04QAGTHR');
    });
});
