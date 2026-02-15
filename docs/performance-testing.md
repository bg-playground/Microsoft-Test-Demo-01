# Performance Testing Strategy

## Overview
Performance testing ensures our application meets user experience standards and Core Web Vitals thresholds.

## Core Web Vitals

### Largest Contentful Paint (LCP)
- **Target**: < 2.5 seconds
- **Measures**: Time to render largest content element
- **Why it matters**: Indicates perceived load speed

### First Input Delay (FID)
- **Target**: < 100 milliseconds
- **Measures**: Time from user interaction to browser response
- **Why it matters**: Indicates interactivity

### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Measures**: Visual stability during page load
- **Why it matters**: Prevents unexpected layout changes

## Performance Budgets

- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Total Page Load**: < 5s
- **JavaScript Bundle**: < 500KB
- **Image Assets**: < 1MB total

## Testing Approach

We use Playwright's Performance APIs to measure real-world metrics in automated tests.

## Continuous Monitoring

Performance tests run on every commit, catching regressions early in the development cycle.
