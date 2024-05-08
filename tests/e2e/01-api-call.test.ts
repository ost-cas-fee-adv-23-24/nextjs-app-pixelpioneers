import { expect, test } from '@playwright/test';
import { urlApiTestApp } from '../utils';
import { Post } from '@/src/models/message.model';

test.describe('should have mock data ready from API for starting e2e tests ', () => {
    test('should listen all network requests ', async ({ page }) => {
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

    test('should have posts from API called and filled them in body ', async ({ page }) => {
        await page.goto(`${urlApiTestApp}/posts`);

        expect(await page.textContent('body')).toContain('claudio');
        expect(await page.textContent('body')).toContain('hello from API 2');
    });

    test('should have a reply from API called wiih its parentId ', async ({ page }) => {
        await page.goto(`${urlApiTestApp}/posts/01HVTHCF8B2KHT0FBG04QAGTHR/replies`);

        // check the parentId
        expect(await page.textContent('body')).toContain('01HVTHCF8B2KHT0FBG04QAGTHR');
        // check the creator id
        expect(await page.textContent('body')).toContain('245808142053636950');
        // check the username
        expect(await page.textContent('body')).toContain('claudio');
    });

    test('should have posts from API called and filled them in the web app ', async ({ page }) => {
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
