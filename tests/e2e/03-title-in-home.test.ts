import { expect, test } from '@playwright/test';

test.describe('should open the start of Mumble App and check main elements ', () => {
    test('should have correct welcome title and check correct title', async ({ page }) => {
        await page.goto('/');

        const welcomeText = await page.innerText('h2');
        expect(welcomeText).toBe('Willkommen auf Mumble');
    });
});
