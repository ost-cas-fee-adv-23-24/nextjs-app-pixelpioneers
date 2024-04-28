import { expect, test } from '@playwright/test';

test('Check the welcome text', async ({ page }) => {
    await page.route('http://localhost:3100/api/posts', async (route) => {
        const request = route.request();
        const postData = await request.postDataJSON();

        console.info('postData', postData);

        await page.goto(`http://localhost:3000`);

        const welcomeText = await page.innerText('h2');
        expect(welcomeText).toBe('Willkommen auf Mumble');
    });

    // await page.goto('http://localhost:3000');
    // const welcomeText = await page.innerText('h2');
    // expect(welcomeText).toBe('Willkommen auf Mumble');
});
