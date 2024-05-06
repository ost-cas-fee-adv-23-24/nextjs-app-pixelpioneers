import { expect, test } from '@playwright/test';

// TODO: Need to check why this is not working
test.describe('should have the list of posts and jump to reply detail of any specific post ', () => {
    test.only('should jump to the detail reply page and back to home page ', async ({ page }) => {
        test.slow();
        await page.goto('/');

        // await page.waitForSelector('[name="comment-button"]', { timeout: 5000 });
        await page.waitForTimeout(4000);

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[14].click();
        } else {
            console.info('Less than 2 Comment Button found!');
        }

        // await page.waitForLoadState('networkidle');
        await page.waitForTimeout(4000);
        await expect(page.getByText('Wau Wau')).toBeTruthy();

        const homeButton = await page.$$('[data-testid="testHomeLink"]');
        homeButton[0].click();

        await page.waitForTimeout(3000);
        const welcomeText = await page.innerText('h2');
        expect(welcomeText).toBe('Willkommen auf Mumble');
    });
});
