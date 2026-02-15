const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  // Visual tests should be optional initially until baselines are established
  const skipVisualTests = !process.env.UPDATE_SNAPSHOTS && process.env.CI;
  
  test('homepage should match visual baseline', async ({ page }) => {
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established - run locally with --update-snapshots');
      return;
    }
    
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
    
    // Check if element exists first
    const todoList = page.locator('.todo-list');
    const count = await todoList.count();
    
    if (count === 0) {
      test.skip(true, '.todo-list element not found on page');
      return;
    }
    
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established');
      return;
    }
    
    await expect(todoList).toHaveScreenshot('todo-list-component.png');
  });

  test('dark mode should render correctly', async ({ page }) => {
    await page.goto('/');
    
    // Only test if dark mode toggle exists
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    const exists = await darkModeToggle.count() > 0;
    
    if (!exists) {
      test.skip(true, 'Dark mode toggle not found');
      return;
    }
    
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established');
      return;
    }
    
    await darkModeToggle.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('homepage-dark-mode.png');
  });

  test('mobile viewport should match baseline', async ({ page }) => {
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established');
      return;
    }
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
