const { test, expect, devices } = require('@playwright/test');

test.describe('Device Emulation Tests', () => {
  test('should work on iPhone 13', async ({ browser }) => {
    const iPhone13 = devices['iPhone 13'];
    const context = await browser.newContext({
      ...iPhone13,
    });
    const page = await context.newPage();
    
    await page.goto('https://playwright.dev');
    
    // Verify page loads
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Verify page content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/device-iphone13.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('should work on Pixel 5', async ({ browser }) => {
    const pixel5 = devices['Pixel 5'];
    const context = await browser.newContext({
      ...pixel5,
    });
    const page = await context.newPage();
    
    await page.goto('https://playwright.dev');
    
    // Verify page loads
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Verify page content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/device-pixel5.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('should work on iPad Pro', async ({ browser }) => {
    const iPadPro = devices['iPad Pro'];
    const context = await browser.newContext({
      ...iPadPro,
    });
    const page = await context.newPage();
    
    await page.goto('https://playwright.dev');
    
    // Verify page loads
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    // Verify page content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Verify navigation is present
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/device-ipadpro.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('should handle touch events on mobile devices', async ({ browser }) => {
    const iPhone13 = devices['iPhone 13'];
    const context = await browser.newContext({
      ...iPhone13,
    });
    const page = await context.newPage();
    
    await page.goto('https://playwright.dev');
    
    // Verify touch support
    const hasTouch = await page.evaluate(() => {
      return 'ontouchstart' in window;
    });
    expect(hasTouch).toBeTruthy();
    
    await context.close();
  });

  test('should respect device user agent', async ({ browser }) => {
    const pixel5 = devices['Pixel 5'];
    const context = await browser.newContext({
      ...pixel5,
    });
    const page = await context.newPage();
    
    await page.goto('https://playwright.dev');
    
    // Verify user agent contains mobile indicator
    const userAgent = await page.evaluate(() => navigator.userAgent);
    expect(userAgent).toContain('Mobile');
    
    await context.close();
  });
});
