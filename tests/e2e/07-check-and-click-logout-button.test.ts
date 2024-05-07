import { expect, test } from '@playwright/test';

test.describe('should open the browser with the start route and interactive with login button ', () => {
    test('should use the mocks server for API calls ', async ({ page }) => {
        await page.goto('/');

        // Listen for all network requests
        page.route('**/*', (route) => {
            console.info('Request URL:', route.request().url());
            route.continue();
        });

        await page.goto('/');
    });

    test('should have a specific info text existed without logged in ', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('p');
        expect(welcomeText).toBe('#test');
    });

    test.only('should have logged in and textarea exists ', async ({ page }) => {
        await page.goto('/');

        const textArea = await page.getByText('Deine Meinung zählt!');
        console.info(textArea);

        expect(textArea).toBeVisible;
    });

    test.only('should have logged out and textarea disappears ', async ({ page }) => {
        await page.goto('/');

        await page.click('button >> text=Log out');

        const textArea = await page.getByText('Deine Meinung zählt!');
        console.info(textArea);

        expect(textArea).not.toBeVisible;
    });
});
