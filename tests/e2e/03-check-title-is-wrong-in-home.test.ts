import { expect, test } from '@playwright/test';

test.describe('should open the start of Mumble App ', () => {
    test('should not have the correct welcome title ', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('h2');
        expect(welcomeText).not.toBe('Willkommen auf OST');
    });
});
