import { expect, test } from '@playwright/test';
import { urlTestApp } from '../utils';

// TODO: Need to check how to solve with login
test.skip('should jump to the detail reply page ', async ({ page }) => {
    await page.goto(urlTestApp);

    // Check if the element textarea exists (after logged in)
    const commentButton = await page.$$('[data-testid="testCommentButton"]');

    if (commentButton.length >= 2) {
        await commentButton[14].click();

        // Wait for the page to load after the click
        await page.waitForLoadState();
    } else {
        console.info('Less than 2 Comment Button found!');
    }

    await page.waitForLoadState();
    const currentUrl = page.url();
    const expectedUrl = `${urlTestApp}/post/01HVTHCF8B2KHT0FBG04QAGTHR`;

    expect(currentUrl).toEqual(expectedUrl);
});