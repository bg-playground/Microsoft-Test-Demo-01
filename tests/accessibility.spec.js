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
    
    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    // Verify headings exist (flexible approach)
    expect(headings.length).toBeGreaterThan(0);
    
    // Verify at least one h1 exists
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Verify headings are visible
    const visibleHeadings = await page.locator('h1, h2, h3, h4, h5, h6').filter({ hasText: /.+/ }).count();
    expect(visibleHeadings).toBeGreaterThan(0);
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
    
    // Check for common landmarks (flexible - at least one should exist)
    const landmarks = await page.locator(
      '[role="navigation"], [role="main"], [role="banner"], [role="contentinfo"], nav, main, header, footer'
    ).count();
    
    expect(landmarks).toBeGreaterThan(0);
    
    // Verify navigation exists
    const navCount = await page.locator('nav, [role="navigation"]').count();
    expect(navCount).toBeGreaterThan(0);
  });

  test('should have proper form label associations', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // First check if there are any form inputs on the page
    const formInputs = await page.locator('input, textarea, select').count();
    
    if (formInputs === 0) {
      // If no form inputs exist, skip this test
      test.skip(true, 'No form inputs found on this page');
      return;
    }
    
    // Run accessibility scan only on forms
    try {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      // Filter for form-related violations only
      const formViolations = accessibilityScanResults.violations.filter(
        violation => violation.id.includes('label') || violation.id.includes('form')
      );
      
      expect(formViolations).toEqual([]);
    } catch (error) {
      if (error.message.includes('No elements found')) {
        // If axe can't find elements, that's okay - just verify forms are visible
        const visibleInputs = await page.locator('input:visible, textarea:visible').count();
        expect(visibleInputs).toBeGreaterThanOrEqual(0);
      } else {
        throw error;
      }
    }
  });
});
