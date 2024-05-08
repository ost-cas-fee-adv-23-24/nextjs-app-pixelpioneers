import { expect, test } from '@playwright/test';

test.describe('should start web app with the home route and interactive with login button ', () => {
    test('should have a post text existed by logged in ', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('p');
        expect(welcomeText).toBe('#test');
    });

    test('should have textarea existed by logged in ', async ({ page }) => {
        await page.goto('/');

        const textArea = await page.getByText('Deine Meinung zählt!');
        console.info(textArea);

        expect(textArea).toBeVisible;
    });

    test('should not have textarea appeared by logged out ', async ({ page }) => {
        await page.goto('/');

        await page.click('button >> text=Log out');

        const textArea = await page.getByText('Deine Meinung zählt!');
        console.info(textArea);

        expect(textArea).not.toBeVisible;
    });
});
