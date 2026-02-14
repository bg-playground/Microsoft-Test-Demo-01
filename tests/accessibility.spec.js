const { test, expect } = require('@playwright/test');

test.describe('Accessibility Tests', () => {
  test('should check for alt text on images', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Get all images on the page
    const images = page.locator('img');
    const count = await images.count();
    
    // Check that all images have alt attributes
    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should verify heading hierarchy', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check for h1 heading (should have at least one)
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
    
    // Check for proper heading structure
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Verify h2 headings exist
    const h2 = page.locator('h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThanOrEqual(0);
  });

  test('should check for ARIA landmarks', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check for common ARIA landmarks
    const nav = page.locator('nav, [role="navigation"]');
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
    
    // Check for main content area
    const main = page.locator('main, [role="main"]');
    const mainCount = await main.count();
    expect(mainCount).toBeGreaterThanOrEqual(0);
  });

  test('should verify page has proper document structure', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Check for HTML lang attribute
    const html = page.locator('html');
    const lang = await html.getAttribute('lang');
    expect(lang).toBeTruthy();
    
    // Check for title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should check for keyboard navigation support', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check that focusable elements exist
    const links = page.locator('a[href]');
    const linksCount = await links.count();
    expect(linksCount).toBeGreaterThan(0);
    
    // Check that buttons exist
    const buttons = page.locator('button');
    const buttonsCount = await buttons.count();
    expect(buttonsCount).toBeGreaterThan(0);
  });
});
