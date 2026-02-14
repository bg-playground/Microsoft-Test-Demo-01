const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test('should navigate to playwright.dev and verify URL', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveURL(/playwright\.dev/);
  });

  test('should check page title on example.com', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
  });

  test('should verify navigation links are present and clickable', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Check that the docs link exists
    const docsLink = page.locator('a:has-text("Docs")').first();
    await expect(docsLink).toBeVisible();
    
    // Verify the link is clickable by checking it has href attribute
    await expect(docsLink).toHaveAttribute('href', /.+/);
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Click on a navigation link
    await page.locator('a:has-text("API")').first().click();
    
    // Verify navigation occurred
    await expect(page).toHaveURL(/api/);
  });
});
