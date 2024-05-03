import { expect, test } from '@playwright/test';

test.describe('should open the start of Mumble App ', () => {
    test('should have correct welcome title', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('h2');
        expect(welcomeText).toBe('Willkommen auf Mumble');
    });
});
