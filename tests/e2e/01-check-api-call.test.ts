import { expect, test } from '@playwright/test';
import { urlApiTestApp } from '../utils';
import { Post } from '@/src/models/message.model';

test.describe('should use and check mock data using Playwright ', () => {
    test('should use the mocks server for API calls ', async ({ page }) => {
        // Listen for all network requests
        page.route(`${urlApiTestApp}/*`, (route) => {
            console.info('Request URL:', route.request().url());
            route.continue();
        });
        await page.goto('/');
    });

    test.beforeAll(async ({ request }) => {
        const response = await request.get(`${urlApiTestApp}/posts`, {});
        expect(response.ok()).toBeTruthy();

        const issues = await request.get(`${urlApiTestApp}/posts`);
        expect(issues.ok()).toBeTruthy();
    });

    test('should have an API called of all posts filled in body ', async ({ page }) => {
        await page.goto(`${urlApiTestApp}/posts`);

        expect(await page.textContent('body')).toContain('claudio');
        expect(await page.textContent('body')).toContain('hello from API 2');
    });

    test('should have an API called of an specific reply with its parentId ', async ({ page }) => {
        await page.goto(`${urlApiTestApp}/posts/01HVTHCF8B2KHT0FBG04QAGTHR/replies`);

        // check the parentId
        expect(await page.textContent('body')).toContain('01HVTHCF8B2KHT0FBG04QAGTHR');
        // check the creator id
        expect(await page.textContent('body')).toContain('245808142053636950');
        // check the username
        expect(await page.textContent('body')).toContain('claudio');
    });

    test('should check if API is ready and web app has mock data filled ', async ({ page }) => {
        let response: Post;
        await page.route(`${urlApiTestApp}/posts`, (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify(response),
            }),
        );

        await page.goto('/');

        await expect(page.getByText('claudio')).toBeTruthy();
        await expect(page.getByText('hello from API 2')).toBeTruthy();
    });
});
