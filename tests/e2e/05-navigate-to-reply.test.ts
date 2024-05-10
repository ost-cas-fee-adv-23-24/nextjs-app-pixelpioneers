import { expect, test } from '@playwright/test';

test.describe('should get the list of posts and navigate to the reply ', () => {
    test('should navigate to the detail reply page and finally back to home route ', async ({
        page,
    }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[14].click();
        }

        await page.waitForTimeout(4000);
        await expect(page.getByText('Wau Wau')).toBeTruthy();

        const homeButton = await page.$$('[data-testid="testHomeLink"]');
        homeButton[0].click();

        await page.waitForTimeout(3000);
        const welcomeText = await page.innerText('h2');
        expect(welcomeText).toBe('Willkommen auf Mumble');
    });
});
