const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:3000/');

    // Check that the page loaded correctly
    // const content = await page.textContent('body');

    await browser.close();
})();
