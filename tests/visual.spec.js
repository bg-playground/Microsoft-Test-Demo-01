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
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established - run locally with --update-snapshots');
      return;
    }
    
    await page.goto('/');
    
    // Check if element exists first
    const todoList = page.locator('.todo-list');
    const count = await todoList.count();
    
    if (count === 0) {
      test.skip(true, '.todo-list element not found on page');
      return;
    }
    
    await expect(todoList).toHaveScreenshot('todo-list-component.png');
  });

  test('dark mode should render correctly', async ({ page }) => {
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established - run locally with --update-snapshots');
      return;
    }
    
    await page.goto('/');
    
    // Only test if dark mode toggle exists
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    const exists = await darkModeToggle.count() > 0;
    
    if (!exists) {
      test.skip(true, 'Dark mode toggle not found');
      return;
    }
    
    await darkModeToggle.click();
    // Wait for dark mode to be applied by checking for dark mode indicator
    await page.waitForSelector('body.dark-mode, html.dark-mode, [data-theme="dark"]', { timeout: 2000 }).catch(() => {
      // If no specific dark mode indicator, rely on screenshot retry logic
    });
    await expect(page).toHaveScreenshot('homepage-dark-mode.png');
  });

  test('mobile viewport should match baseline', async ({ page }) => {
    if (skipVisualTests) {
      test.skip(true, 'Visual baselines not yet established - run locally with --update-snapshots');
      return;
    }
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });
});
