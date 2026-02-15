const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/');
    
    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const paintMetrics = performance.getEntriesByType('paint');
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      
      return {
        firstPaint: paintMetrics.find(m => m.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintMetrics.find(m => m.name === 'first-contentful-paint')?.startTime || 0,
        domContentLoaded: navigationTiming?.domContentLoadedEventEnd - navigationTiming?.domContentLoadedEventStart || 0,
        loadComplete: navigationTiming?.loadEventEnd - navigationTiming?.loadEventStart || 0
      };
    });
    
    // Assert performance budgets
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1800); // FCP < 1.8s
    expect(performanceMetrics.loadComplete).toBeLessThan(3000); // Load < 3s
  });
  
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000); // Page loads in under 5 seconds
  });
  
  test('should have reasonable JavaScript bundle size', async ({ page }) => {
    const resources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(r => r.name.includes('.js'))
        .map(r => ({ name: r.name, size: r.transferSize }));
    });
    
    const totalJsSize = resources.reduce((sum, r) => sum + r.size, 0);
    expect(totalJsSize).toBeLessThan(500000); // Total JS < 500KB
  });
});
