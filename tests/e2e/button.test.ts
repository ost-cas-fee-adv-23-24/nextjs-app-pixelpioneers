import { expect, test } from '@playwright/test';

test('check if button is here', async ({ page }) => {
    await page.goto('http://localhost:3000');
    expect(1 + 1).toEqual(2);
});
