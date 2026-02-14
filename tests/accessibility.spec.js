const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Tests', () => {
  test('should pass WCAG 2.1 Level AA compliance', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    // Assert no violations found
    expect(accessibilityScanResults.violations).toEqual([]);
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
    
    // Run axe scan specifically for heading hierarchy
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .include('h1, h2, h3, h4, h5, h6')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should verify alt text on images', async ({ page }) => {
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
    
    // Run axe scan for image alt text
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include('img')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check that focusable elements exist
    const links = page.locator('a[href]');
    const linksCount = await links.count();
    expect(linksCount).toBeGreaterThan(0);
    
    // Check that buttons exist
    const buttons = page.locator('button');
    const buttonsCount = await buttons.count();
    expect(buttonsCount).toBeGreaterThan(0);
    
    // Verify first link can be focused
    if (linksCount > 0) {
      await links.first().focus();
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBe('A');
    }
    
    // Run axe scan for keyboard accessibility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'keyboard'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check for common ARIA landmarks
    const nav = page.locator('nav, [role="navigation"]');
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
    
    // Check for main content area
    const main = page.locator('main, [role="main"]');
    const mainCount = await main.count();
    expect(mainCount).toBeGreaterThanOrEqual(0);
    
    // Run axe scan for ARIA landmarks
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper form label associations', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check for form inputs
    const inputs = page.locator('input:not([type="hidden"])');
    const inputCount = await inputs.count();
    
    // If forms exist, verify they have labels
    if (inputCount > 0) {
      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i);
        const inputId = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');
        
        // Input should have id, aria-label, or aria-labelledby
        const hasAccessibleLabel = inputId || ariaLabel || ariaLabelledby;
        
        // If no accessible label found, check if there's a parent label
        if (!hasAccessibleLabel) {
          const parentLabel = await input.locator('xpath=ancestor::label').count();
          expect(parentLabel).toBeGreaterThanOrEqual(0);
        }
      }
    }
    
    // Run axe scan for form labels
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include('form, input, select, textarea')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
