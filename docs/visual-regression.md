# Visual Regression Testing

## Overview
Visual regression testing catches unintended UI changes by comparing screenshots against approved baselines.

## How It Works

1. **Baseline Creation**: First test run creates baseline screenshots
2. **Comparison**: Subsequent runs compare against baselines
3. **Diff Detection**: Pixel-by-pixel comparison identifies changes
4. **Review**: Developers review diffs and update baselines if intentional

## Initial Setup

Visual regression tests require baseline screenshots to be created before they can run in CI/CD.

### Creating Baselines Locally

```bash
# Run tests with update flag to create initial baselines
npx playwright test tests/visual.spec.js --update-snapshots

# Commit the baseline screenshots
git add tests/**/*-snapshots/
git commit -m "Add visual regression baselines"
git push
```

### CI/CD Behavior

- **First Run**: Tests will be skipped until baselines are committed
- **After Baselines Exist**: Tests will run and fail if visual changes detected
- **Updating Baselines**: Re-run with `--update-snapshots` and commit changes

## Baseline Storage

Baselines are stored in:
```
tests/visual.spec.js-snapshots/
├── homepage-chromium-linux.png
├── homepage-firefox-linux.png
├── homepage-webkit-linux.png
└── ...
```

These files **should be committed** to version control.

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
