const { test, expect } = require('@playwright/test');

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop HD', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width, height });
      
      // Navigate to the application
      await page.goto('https://playwright.dev');
      
      // Verify page title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // Check navigation visibility
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();
      
      // Take screenshot for viewport
      await page.screenshot({ 
        path: `test-results/responsive-${name.toLowerCase().replace(/\s+/g, '-')}-${width}x${height}.png`,
        fullPage: true 
      });
    });
  });

  test('should handle viewport changes dynamically', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Start with mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForLoadState('networkidle');
    
    // Verify content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Switch to desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
    
    // Verify content still visible
    await expect(body).toBeVisible();
    
    // Verify navigation still present
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
  });

  test('should maintain functionality across viewports', async ({ page }) => {
    const testViewports = [
      { width: 390, height: 844 },   // Mobile
      { width: 1920, height: 1080 }  // Desktop
    ];

    for (const viewport of testViewports) {
      await page.setViewportSize(viewport);
      await page.goto('https://playwright.dev');
      
      // Verify links are clickable
      const links = page.locator('a[href]');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Verify first link is visible and accessible
      if (linkCount > 0) {
        await expect(links.first()).toBeVisible();
      }
    }
  });
});
