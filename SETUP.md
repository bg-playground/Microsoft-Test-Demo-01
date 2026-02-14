# Repository Setup Guide

This guide provides step-by-step instructions for setting up and configuring this repository, including GitHub Pages, security features, and branch protection.

## Table of Contents

- [GitHub Pages Setup](#github-pages-setup)
- [Repository Settings](#repository-settings)
- [Branch Protection](#branch-protection)
- [Security Configuration](#security-configuration)
- [CI/CD Setup](#cicd-setup)
- [Troubleshooting](#troubleshooting)

## GitHub Pages Setup

### Why GitHub Pages Returns 404

**Problem**: The landing page and live demo show 404 errors.

**Root Cause**: GitHub Pages needs to be:
1. Enabled in repository settings
2. Configured to serve from the correct branch and folder
3. All changes need to be merged to the main branch

### Step-by-Step Fix

#### 1. Merge Changes to Main Branch

First, ensure all changes are merged to the `main` branch:

```bash
# If you're on a feature branch, create a PR and merge it
# Or, if you have permissions:
git checkout main
git merge copilot/add-ai-testing-concepts
git push origin main
```

#### 2. Enable GitHub Pages

1. **Navigate to Repository Settings**
   - Go to your GitHub repository
   - Click **Settings** tab (top right)

2. **Find Pages Section**
   - Scroll down the left sidebar
   - Click **Pages** under "Code and automation"

3. **Configure Source**
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main`
   - **Folder**: Select `/docs`
   - Click **Save**

4. **Wait for Deployment**
   - GitHub Pages takes 1-5 minutes to deploy
   - A green checkmark will appear when ready
   - Your site URL will be displayed

#### 3. Verify Your Site

After deployment, your sites will be available at:

- **Landing Page**: `https://bg-playground.github.io/Microsoft-Test-Demo-01/`
- **Live Demo**: `https://bg-playground.github.io/Microsoft-Test-Demo-01/src/`

### Alternative: GitHub Actions Deployment

If you prefer automated deployment:

1. Use the GitHub Pages action
2. Configure workflow to deploy on push to main
3. See `.github/workflows/` for examples

## Repository Settings

### Recommended General Settings

Navigate to **Settings** → **General**:

#### Features
- ✅ **Issues**: Enable for bug tracking
- ✅ **Projects**: Enable for project management
- ✅ **Discussions**: Optional, for community engagement
- ✅ **Wiki**: Optional, for additional documentation

#### Pull Requests
- ✅ **Allow merge commits**: Enable
- ✅ **Allow squash merging**: Enable (recommended)
- ✅ **Allow rebase merging**: Enable
- ✅ **Always suggest updating pull request branches**: Enable
- ✅ **Automatically delete head branches**: Enable

#### Archives
- ✅ **Include Git LFS objects**: If using LFS

## Branch Protection

### Protect Main Branch

Navigate to **Settings** → **Branches** → **Add branch protection rule**

#### Rule for `main` Branch

**Branch name pattern**: `main`

##### Protect matching branches

- ✅ **Require a pull request before merging**
  - ✅ Require approvals: 1 (or more for teams)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (if CODEOWNERS file exists)

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Select required checks:
    - `Playwright Tests` (from GitHub Actions)
    - `CodeQL` (if enabled)

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits** (recommended for enhanced security)

- ✅ **Require linear history** (optional, prevents merge commits)

- ✅ **Include administrators** (optional, applies rules to admins too)

##### Rules applied to everyone including administrators

- ✅ **Allow force pushes**: ❌ Disable
- ✅ **Allow deletions**: ❌ Disable

### Example Branch Protection Configuration

```yaml
Branch Protection Rules for 'main':
├── Require pull request reviews
│   ├── Required approvals: 1
│   └── Dismiss stale reviews: Yes
├── Require status checks
│   ├── Playwright Tests: Required
│   └── Branch must be up to date: Yes
├── Require conversation resolution: Yes
├── Require signed commits: Yes (recommended)
└── Restrictions
    ├── Force pushes: Disabled
    └── Deletions: Disabled
```

## Security Configuration

### Enable Security Features

Navigate to **Settings** → **Security**

#### Dependabot

1. **Dependabot alerts**
   - ✅ Enable: Alerts for vulnerable dependencies
   
2. **Dependabot security updates**
   - ✅ Enable: Automatic PRs for security updates
   
3. **Dependabot version updates**
   - ✅ Enable: Automatic PRs for version updates
   - Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "your-github-username"
```

#### Code Scanning

1. **CodeQL Analysis**
   - ✅ Enable: Automated code scanning
   - It's already configured in `.github/workflows/`
   
2. **Secret Scanning**
   - ✅ Enable: Detects committed secrets
   - Available for public repositories by default

#### Security Policy

- ✅ `SECURITY.md` file already created
- Defines vulnerability reporting process

### Private Vulnerability Reporting

Navigate to **Settings** → **Security** → **Reporting**

- ✅ Enable: Allows private security reports
- Advisories can be published after fixes

## CI/CD Setup

### GitHub Actions

Your repository already has GitHub Actions configured:

#### Existing Workflow

- **File**: `.github/workflows/playwright.yml`
- **Triggers**: Push to main, Pull requests
- **Jobs**: Install, test, report

#### Verify Workflow

1. Go to **Actions** tab
2. Check recent workflow runs
3. Ensure tests are passing
4. Review artifacts (test reports)

#### Required Secrets

Currently, no secrets are required. If adding:

1. **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets
3. Reference in workflows: `${{ secrets.SECRET_NAME }}`

## Troubleshooting

### GitHub Pages 404 Issues

**Problem**: Pages show 404 errors

**Solutions**:

1. **Check Branch**
   ```bash
   # Ensure changes are on main
   git checkout main
   git pull origin main
   ```

2. **Verify Settings**
   - Settings → Pages → Source must be `main` branch, `/docs` folder

3. **Check File Paths**
   - `docs/index.html` must exist
   - Files must be in `docs/` directory

4. **Wait for Deployment**
   - Takes 1-5 minutes after pushing
   - Check Actions tab for deployment status

5. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Build Failures

**Problem**: GitHub Actions failing

**Solutions**:

1. **Check Logs**
   - Actions tab → Failed workflow → View logs

2. **Common Issues**:
   - Node version mismatch: Update in workflow
   - Missing dependencies: Run `npm install`
   - Test failures: Fix failing tests

3. **Local Testing**:
   ```bash
   npm install
   npx playwright install
   npm test
   ```

### Branch Protection Conflicts

**Problem**: Cannot push to main

**Expected**: Branch protection is working correctly!

**Solution**: Use pull requests:
```bash
git checkout -b feature/my-feature
# Make changes
git push origin feature/my-feature
# Create PR on GitHub
```

## Recommended Branch Strategy

### Development Workflow

```
main (protected)
  ├── feature/landing-page
  ├── feature/new-tests
  └── fix/bug-123
```

### Guidelines

1. **Main Branch**
   - Always deployable
   - Protected, no direct pushes
   - Merge only via PRs

2. **Feature Branches**
   - Named: `feature/description`
   - Created from main
   - Merged via PR

3. **Fix Branches**
   - Named: `fix/description`
   - For bug fixes
   - Merged via PR

4. **Release Strategy**
   - Tag releases: `v1.0.0`
   - Create releases on GitHub
   - Document changes in release notes

## Post-Setup Checklist

After completing setup:

- [ ] GitHub Pages enabled and working
- [ ] Branch protection on main configured
- [ ] Dependabot alerts enabled
- [ ] CodeQL scanning active
- [ ] Secret scanning enabled
- [ ] CI/CD workflow passing
- [ ] Repository settings configured
- [ ] SECURITY.md reviewed
- [ ] Team members added (if applicable)
- [ ] README badges updated

## Maintenance

### Weekly Tasks
- Review Dependabot PRs
- Check security alerts
- Monitor CI/CD status

### Monthly Tasks
- Review and update dependencies
- Audit security settings
- Review branch protection rules
- Update documentation

### Quarterly Tasks
- Security audit
- Performance review
- Documentation refresh
- Dependency major version updates

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Branch Protection Rules](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Dependabot Documentation](https://docs.github.com/code-security/dependabot)
- [CodeQL Documentation](https://codeql.github.com/docs/)

## Support

For issues or questions:
- Create an issue in the repository
- Review existing documentation
- Check troubleshooting section above

---

**Last Updated**: February 2024  
**Version**: 1.0
