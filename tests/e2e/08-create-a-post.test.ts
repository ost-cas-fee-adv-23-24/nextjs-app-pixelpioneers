import { expect, test } from '@playwright/test';

test.describe('should have created a new post ', () => {
    test('should have created a new post and updated list of posts', async ({ page }) => {
        test.slow();
        await page.goto('/');

        await page.getByPlaceholder('Deine Meinung').fill('Hier hat es einen neuen Post 2');
        await page.getByRole('button', { name: 'Absenden' }).click();

        await page.evaluate(async () => {
            const response = await fetch('http://localhost:3110/api/config', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mock: {
                        collections: {
                            selected: 'updated-posts',
                        },
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        });

        await page.waitForTimeout(4000);

        await page.goto('/');

        await page.waitForTimeout(4000);

        await expect(page.getByText('Hier hat es einen neuen Post 2')).toBeTruthy();
    });
});
