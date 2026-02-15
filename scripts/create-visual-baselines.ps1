Write-Host "Creating visual regression baselines..."
Write-Host "This should be run locally before committing to the repository."
Write-Host ""

# Run visual tests with update flag
npx playwright test tests/visual.spec.js --update-snapshots

Write-Host ""
Write-Host "Baselines created! Review the screenshots in tests/visual.spec.js-snapshots/"
Write-Host "If they look correct, commit them:"
Write-Host "  git add tests/**/*-snapshots/"
Write-Host "  git commit -m 'Add visual regression baselines'"
Write-Host "  git push"
