# Visual Regression Testing

## Overview
Visual regression testing catches unintended UI changes by comparing screenshots against approved baselines.

## How It Works

1. **Baseline Creation**: First test run creates baseline screenshots
2. **Comparison**: Subsequent runs compare against baselines
3. **Diff Detection**: Pixel-by-pixel comparison identifies changes
4. **Review**: Developers review diffs and update baselines if intentional

## Baseline Management

Baseline screenshots are stored in `tests/__screenshots__/` directory.

### Updating Baselines
```bash
# Update all baselines
npx playwright test --update-snapshots

# Update specific test
npx playwright test visual.spec.js --update-snapshots
```

## Tolerance Settings

- **maxDiffPixels**: 100 (allows minor anti-aliasing differences)
- **threshold**: 0.2 (20% pixel difference tolerance)

## Best Practices

- ✅ Wait for animations to complete before screenshots
- ✅ Use `waitForLoadState('networkidle')` before capture
- ✅ Disable dynamic content (dates, random IDs) in tests
- ✅ Test multiple viewports (mobile, tablet, desktop)
- ✅ Review diffs carefully before updating baselines

## CI/CD Integration

Visual tests run on every PR. If diffs are detected:
1. Test fails
2. Diff images uploaded as artifacts
3. Developer reviews diffs
4. Updates baselines if changes are intentional

## Troubleshooting

**Problem**: Tests fail with small pixel differences
**Solution**: Increase `maxDiffPixels` or use `maxDiffPixelRatio`

**Problem**: Screenshots inconsistent across environments
**Solution**: Use Docker for consistent rendering
