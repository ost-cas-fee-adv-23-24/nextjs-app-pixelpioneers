import { expect, test } from '@playwright/test';

test('check if button is here', async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('check check if button is here', async ({ page }) => {
    await page.route('http://localhost:3100/api/posts?limit=15', async (route) => {
        const request = route.request();
        const postData = await request.postDataJSON();

        console.info('postData ', postData);

        await page.goto('http://localhost:3000');
        expect(1 + 1).toEqual(2);
    });
});
