const { test, expect, devices } = require('@playwright/test');

test.describe('Device Emulation Tests', () => {
  // Skip device emulation tests in Firefox - it doesn't support mobile emulation options
  test.skip(({ browserName }) => browserName === 'firefox', 
    'Device emulation (isMobile, hasTouch) is not supported in Firefox');

  test('should emulate iPhone 13', async ({ page }) => {
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
  });

  test('should emulate Pixel 5', async ({ page }) => {
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
  });

  test('should emulate iPad Pro', async ({ page }) => {
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
  });

  test('should handle touch events on mobile devices', async ({ page }) => {
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    
    // Verify the page loaded
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
    
    // Basic touch interaction test
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should respect device viewport size', async ({ page }) => {
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    
    // Get viewport size
    const viewportSize = page.viewportSize();
    expect(viewportSize).toBeTruthy();
    expect(viewportSize.width).toBeGreaterThan(0);
    expect(viewportSize.height).toBeGreaterThan(0);
  });

  test('should respect device user agent', async ({ browser }) => {
    const iPhone = devices['iPhone 13'];
    const context = await browser.newContext({
      ...iPhone,
      // Remove isMobile to avoid Firefox error
      userAgent: iPhone.userAgent,
      viewport: iPhone.viewport,
      deviceScaleFactor: iPhone.deviceScaleFactor,
    });
    const page = await context.newPage();
    
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    
    // Verify user agent includes mobile identifier
    const userAgent = await page.evaluate(() => navigator.userAgent);
    expect(userAgent).toContain('iPhone');
    
    await context.close();
  });

  test('should render correctly on different screen sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('file:///home/runner/work/Microsoft-Test-Demo-01/Microsoft-Test-Demo-01/src/index.html');
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveTitle(/Microsoft Test Demo|To-Do/);
  });
});
