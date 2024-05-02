import { expect, test } from '@playwright/test';
import { urlApiTestApp, urlTestApp } from '../utils';

test('should use the mocks server for API calls', async ({ page }) => {
    // Listen for all network requests
    page.route(`${urlApiTestApp}/*`, (route) => {
        console.info('Request URL:', route.request().url());
        route.continue();
    });

    await page.goto(urlTestApp);
});

test('should have an API call of all posts exists', async ({ page }) => {
    await page.goto(`${urlApiTestApp}/posts`);

    expect(await page.textContent('body')).toContain('claudio');
    expect(await page.textContent('body')).toContain('hello from API 2');
});

test('should have an API call of an reply with specific ID exists', async ({ page }) => {
    await page.goto(`${urlApiTestApp}/posts/01HVTHCF8B2KHT0FBG04QAGTHR/replies`);

    // check the parentId
    expect(await page.textContent('body')).toContain('01HVTHCF8B2KHT0FBG04QAGTHR');
    // check the creator id
    expect(await page.textContent('body')).toContain('245808142053636950');
    // check the username
    expect(await page.textContent('body')).toContain('claudio');
});
