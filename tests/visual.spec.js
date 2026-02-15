const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('homepage should match visual baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });
  
  test('to-do list component should render correctly', async ({ page }) => {
    await page.goto('/');
    
    // Focus on specific component
    const todoList = page.locator('.todo-list');
    await expect(todoList).toHaveScreenshot('todo-list-component.png');
  });
  
  test('dark mode should render correctly', async ({ page }) => {
    await page.goto('/');
    
    // Toggle dark mode if available
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    if (await darkModeToggle.count() > 0) {
      await darkModeToggle.click();
      // Wait for dark mode class to be applied (adjust selector as needed)
      await page.waitForSelector('body.dark-mode, html.dark-mode, [data-theme="dark"]', { timeout: 2000 }).catch(() => {
        // If no specific dark mode indicator, wait for visual changes to settle
        return page.waitForLoadState('networkidle');
      });
      await expect(page).toHaveScreenshot('homepage-dark-mode.png');
    } else {
      test.skip();
    }
  });
  
  test('mobile viewport should match baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
