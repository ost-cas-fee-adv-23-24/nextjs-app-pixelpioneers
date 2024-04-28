import { expect, test } from '@playwright/test';

test.skip('Check there is a specific text existed with not logged in ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('um einen Post zu verfassen.');
});

test('Check there is a specific post existed after log in ', async ({ page }) => {
    await page.route('http://localhost:3100/api/posts', async (route) => {
        const request = route.request();
        const postData = await request.postDataJSON();
        console.info('postData ', postData);

        await page.goto(`http://localhost:3000`);

        const firstPostText = await page.getByTestId('testPostData').getByText;
        expect(firstPostText).toBe('#test');

        const welcomeText = await page.innerText('p');
        expect(welcomeText).toBe('hello from API 2');
    });
});

test.skip('button click experiment ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    await page.click('button >> text=Log in');

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('hello from API 2');
});
