import { expect, test } from '@playwright/test';
import { switchCollection } from '../utils';

test.describe('should have created a reply in a post ', () => {
    test('should have created a reply post and updated list of posts', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.waitForTimeout(4000);

        const commentButton = await page.$$('[data-testid="testCommentButton"]');

        if (commentButton.length >= 2) {
            await commentButton[0].click();
        }

        await page.waitForTimeout(4000);
        await expect(page.getByText('Hier hat es einen neuen Post 2')).toBeTruthy();

        await page.getByPlaceholder('Und was meinst du').fill('Ich habe eine andere Meinung');
        await page.getByRole('button', { name: 'Absenden' }).click();

        switchCollection(page, 'added-reply-in-post');

        await page.waitForTimeout(4000);
        await page.goto('/');
        await page.waitForTimeout(4000);

        const newCommentButton = await page.$$('[data-testid="testCommentButton"]');
        if (newCommentButton.length >= 2) {
            await newCommentButton[0].click();
        }
        await page.waitForTimeout(4000);

        await expect(page.getByText('Ich habe eine andere Meinung')).toBeTruthy();
    });
});
