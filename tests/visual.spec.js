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
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('homepage-dark-mode.png');
    }
  });
  
  test('mobile viewport should match baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
