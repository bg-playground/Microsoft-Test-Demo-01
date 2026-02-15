#!/bin/bash

echo "Creating visual regression baselines..."
echo "This should be run locally before committing to the repository."
echo ""

# Run visual tests with update flag
npx playwright test tests/visual.spec.js --update-snapshots

echo ""
echo "Baselines created! Review the screenshots in tests/visual.spec.js-snapshots/"
echo "If they look correct, commit them:"
echo "  git add tests/**/*-snapshots/"
echo "  git commit -m 'Add visual regression baselines'"
echo "  git push"
