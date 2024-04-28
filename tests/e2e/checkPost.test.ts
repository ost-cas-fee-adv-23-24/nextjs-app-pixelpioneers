import { expect, test } from '@playwright/test';

test('should use the mocks server for API calls', async ({ page }) => {
    // Listen for all network requests
    page.route('**/*', (route) => {
        console.info('Request URL:', route.request().url());
        route.continue();
    });

    await page.goto('/'); // This will go to 'http://localhost:3000'
    // Add your test steps here...
});

test.skip('Check there is a specific text existed with not logged in ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('um einen Post zu verfassen.');
});

test('Check there is a specific post existed after log in ', async ({ page }) => {
    page.route('http://localhost:3100/api/posts', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                /* your mock data */
            }),
        });
    });

    // await page.route('http://localhost:3100/api/posts', async (route) => {
    //     const request = route.request();
    //     const postData = await request.postDataJSON();
    //     console.info('postData ', postData);

    //     await page.goto(`http://localhost:3000`);

    // const firstPostText = await page.getByTestId('testPostData').innerText;
    // expect(firstPostText).toBe('#test');

    // const element = await page.$('[data-testid="testPostData"]');
    // const content =element && await element.textContent();
    // expect(content).toBe('test');

    // const element = await page.getByTestId('testPostDatat');
    // const content = await element.textContent();
    // expect(content).toBe('test');

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('hello from API 2');
    // });
});

test.skip('button click experiment ', async ({ page }) => {
    await page.goto(`http://localhost:3000`);

    await page.click('button >> text=Log in');

    const welcomeText = await page.innerText('p');
    expect(welcomeText).toBe('hello from API 2');
});
