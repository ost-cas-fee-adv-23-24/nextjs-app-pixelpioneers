import { expect, test } from '@playwright/test';
import { switchCollection } from '../utils';

test.describe('should have created a new post ', () => {
    test('should have created a new post and updated list of posts', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.getByPlaceholder('Deine Meinung').fill('Hier hat es einen neuen Post 2');
        await page.getByRole('button', { name: 'Absenden' }).click();

        switchCollection(page, 'add-reply-in-post');

        await page.waitForTimeout(4000);
        await page.goto('/');
        await page.waitForTimeout(4000);

        await expect(page.getByText('Hier hat es einen neuen Post 2')).toBeTruthy();
    });
});
