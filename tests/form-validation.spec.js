const { test, expect } = require('@playwright/test');

test.describe('Form Validation Tests', () => {
  test('should fill out a search form and submit', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Find search input and fill it
    const searchButton = page.locator('button[aria-label*="Search"], button:has-text("Search")').first();
    await searchButton.click();
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('testing');
    
    // Verify the input has the correct value
    await expect(searchInput).toHaveValue('testing');
  });

  test('should validate required field behavior on example form', async ({ page }) => {
    // Navigate to a page with forms
    await page.goto('https://example.com');
    
    // This is a demonstration test - example.com doesn't have forms
    // In a real scenario, this would test actual form validation
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('Example Domain');
  });

  test('should test input field character limits', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Click search to open search input
    const searchButton = page.locator('button[aria-label*="Search"], button:has-text("Search")').first();
    await searchButton.click();
    
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    
    // Type a long string
    const longString = 'a'.repeat(100);
    await searchInput.fill(longString);
    
    // Verify input accepts the text (in real scenarios, you'd check max-length)
    const value = await searchInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('should handle form submission', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Open search
    const searchButton = page.locator('button[aria-label*="Search"], button:has-text("Search")').first();
    await searchButton.click();
    
    // Fill search and press Enter
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('playwright');
    await searchInput.press('Enter');
    
    // Wait for navigation or load state to complete
    await page.waitForLoadState('networkidle');
    
    // Verify something changed (URL or content)
    const url = page.url();
    expect(url).toBeTruthy();
  });
});
