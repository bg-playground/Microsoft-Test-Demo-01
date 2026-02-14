# Contributing to Microsoft Test Demo

Thank you for your interest in contributing to the Microsoft Test Demo project! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project follows a code of conduct that all contributors are expected to uphold. Please be respectful, inclusive, and considerate in all interactions.

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Microsoft-Test-Demo-01.git
   cd Microsoft-Test-Demo-01
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/bg-playground/Microsoft-Test-Demo-01.git
   ```

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Git

### Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

3. **Verify installation**:
   ```bash
   npm test
   ```

## Making Changes

### Branch Naming Convention

Use descriptive branch names with prefixes:
- `feature/` - New features (e.g., `feature/add-dark-mode`)
- `fix/` - Bug fixes (e.g., `fix/task-deletion-bug`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `test/` - Test additions or modifications (e.g., `test/add-accessibility-tests`)

### Workflow

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our style guidelines

3. **Test your changes**:
   ```bash
   npm test
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add descriptive commit message"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# View test report
npm run test:report
```

### Writing Tests

When adding new tests, follow these guidelines:

1. **Test File Location**: Place test files in the `/tests` directory
2. **Test File Naming**: Use `.spec.js` extension (e.g., `feature-name.spec.js`)
3. **Test Structure**: Follow the AAA pattern (Arrange, Act, Assert)

Example test structure:
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // Arrange - Set up test conditions
    await page.goto('https://example.com');
    
    // Act - Perform the action
    await page.click('#button');
    
    // Assert - Verify the outcome
    await expect(page.locator('#result')).toHaveText('Expected text');
  });
});
```

### Test Best Practices

- ✅ Write clear, descriptive test names
- ✅ Test one thing per test case
- ✅ Use proper selectors (prefer role, label, or text over CSS selectors)
- ✅ Add appropriate waits (avoid `waitForTimeout`)
- ✅ Include accessibility tests where applicable
- ❌ Don't test external sites (test the sample app instead)
- ❌ Don't hardcode sensitive data
- ❌ Don't create interdependent tests

## Submitting Changes

### Pull Request Process

1. **Update documentation** if your changes require it
2. **Ensure all tests pass**
3. **Update the README.md** if you're adding new features
4. **Create a Pull Request** with a clear title and description

### PR Title Format

Use conventional commit format:
- `feat: Add new feature description`
- `fix: Fix bug description`
- `docs: Update documentation`
- `test: Add or update tests`
- `refactor: Refactor code`
- `style: Format or style changes`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Style Guidelines

### JavaScript/TypeScript

- Use ES6+ features (const/let, arrow functions, destructuring)
- Follow Airbnb style guide principles
- Use meaningful variable names
- Add comments for complex logic only
- Keep functions small and focused

Example:
```javascript
// Good
const addTask = (taskText) => {
  if (!taskText.trim()) {
    return null;
  }
  return createTaskObject(taskText);
};

// Avoid
function a(t) {
  if (!t.trim()) return null;
  return createTaskObject(t);
}
```

### HTML

- Use semantic HTML elements
- Include proper ARIA attributes
- Add alt text for images
- Use meaningful IDs and classes

### CSS

- Use CSS variables for colors and common values
- Follow BEM naming convention for classes
- Mobile-first responsive design
- Add comments for complex styles

### Documentation

- Use clear, concise language
- Include code examples where helpful
- Keep markdown formatted consistently
- Update table of contents when adding sections

## Types of Contributions

### Bug Reports

When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/environment information

### Feature Requests

When requesting features:
- Describe the feature clearly
- Explain the use case
- Provide examples if possible
- Consider implementation complexity

### Documentation Improvements

Documentation improvements are always welcome:
- Fix typos or grammar
- Add examples
- Improve clarity
- Add missing information

## Questions?

If you have questions:
- Check existing issues and discussions
- Review the documentation
- Open a new issue with the "question" label

## Recognition

Contributors will be recognized in:
- Project README (once changes are merged)
- Release notes
- GitHub contributors page

Thank you for contributing to Microsoft Test Demo! 🎉
