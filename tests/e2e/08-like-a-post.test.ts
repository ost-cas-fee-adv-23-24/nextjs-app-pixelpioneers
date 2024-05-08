import { expect, test } from '@playwright/test';

test.describe('should have a post liked ', () => {
    test('should have a post liked (3) ', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const likeButton = await page.$$('[data-testid="testLikeButton"]');

        if (likeButton.length >= 2) {
            await likeButton[14].click();
        } else {
            console.info('Less than 2 Like Button found!');
        }
        await page.waitForTimeout(3000);

        const thisBtnLike = await page.$$('.btnLike');
        const content = await page.evaluate((element) => element.textContent, thisBtnLike[14]);

        expect(content).toBe('3 Likes');
    });

    test('should have a post with a like plus and back to not liked (2) ', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const likeButton = await page.$$('[data-testid="testLikeButton"]');

        if (likeButton.length >= 2) {
            await likeButton[14].click();
        } else {
            console.info('Less than 2 Like Button found!');
        }
        await page.waitForTimeout(3000);
        await likeButton[14].click();
        await page.waitForTimeout(3000);

        const thisBtnLike = await page.$$('.btnLike');
        const content = await page.evaluate((element) => element.textContent, thisBtnLike[14]);

        expect(content).toBe('2 Likes');
    });
});
