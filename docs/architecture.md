# System Architecture

## Overview

The Microsoft Test Demo project is structured to demonstrate a complete testing lifecycle using Microsoft-centric tools and technologies. This document outlines the system architecture, component interactions, and technology decisions.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Microsoft Test Demo                          │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   GitHub Repo   │  │  GitHub Pages   │  │  GitHub Actions │ │
│  │                 │  │                 │  │                 │ │
│  │  - Source Code  │  │  - Landing Page │  │  - CI/CD        │ │
│  │  - Tests        │  │  - Live Demo    │  │  - Test Runner  │ │
│  │  - Docs         │  │  - API Docs     │  │  - Reporting    │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                     │          │
│           └────────────────────┴─────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │                                         │
┌────────▼────────┐                     ┌──────────▼────────┐
│  Test Target    │                     │  Testing Tools    │
│                 │                     │                   │
│  To-Do Web App  │◄───────────────────►│  Playwright       │
│  - HTML/CSS/JS  │                     │  - Multi-browser  │
│  - LocalStorage │                     │  - API Testing    │
│  - Accessibility│                     │  - Screenshots    │
└─────────────────┘                     │  - Trace Viewer   │
                                        └───────────────────┘
                                                 │
                                                 │
                                        ┌────────▼────────┐
                                        │   Reporting     │
                                        │                 │
                                        │  - HTML Report  │
                                        │  - Screenshots  │
                                        │  - Trace Files  │
                                        │  - CI Artifacts │
                                        └─────────────────┘
```

## Component Architecture

### 1. Frontend Application (To-Do App)

**Location**: `/src/`

**Technologies**:
- Pure HTML5 (Semantic markup)
- CSS3 (Variables, Grid, Flexbox)
- Vanilla JavaScript (ES6+)

**Key Features**:
- Task CRUD operations
- LocalStorage persistence
- Filter functionality (All/Active/Completed)
- Accessibility (ARIA attributes, keyboard navigation)
- Responsive design
- Character counter

**Data Flow**:
```
User Input → Event Handler → State Update → LocalStorage → DOM Render
```

### 2. Test Suite

**Location**: `/tests/`

**Test Categories**:

#### Navigation Tests (`navigation.spec.js`)
- URL verification
- Page title checking
- Link presence and navigation

#### Form Validation Tests (`form-validation.spec.js`)
- Input handling
- Form submission
- Validation checks

#### Accessibility Tests (`accessibility.spec.js`)
- ARIA landmarks
- Alt text verification
- Heading hierarchy
- Keyboard navigation

#### API Tests (`api.spec.js`)
- GET/POST requests
- Response validation
- Header verification

### 3. CI/CD Pipeline

**Location**: `.github/workflows/playwright.yml`

**Pipeline Stages**:

```
Trigger (Push/PR)
    ↓
Setup Environment
    ├── Checkout code
    ├── Setup Node.js 18
    └── Install dependencies
    ↓
Install Browsers
    ├── Chromium
    ├── Firefox
    └── WebKit
    ↓
Run Tests
    ├── Parallel execution
    ├── Retries on failure
    └── Screenshot on error
    ↓
Collect Artifacts
    ├── HTML reports
    ├── Screenshots
    ├── Trace files
    └── Test results
    ↓
Upload to GitHub
```

### 4. Documentation Site

**Location**: `/docs/`

**Structure**:
```
docs/
├── index.html          # Landing page
├── styles/
│   └── landing.css     # Professional styling
├── test-plan.md        # Test strategy
└── README.md           # Documentation index
```

**Features**:
- Professional landing page
- Live demo embed
- Technology showcase
- Testing lifecycle visualization
- Interactive navigation

## Technology Stack

### Core Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Test Framework | Playwright | ^1.41.0 | End-to-end testing |
| Runtime | Node.js | 18+ | JavaScript execution |
| Package Manager | npm | 9+ | Dependency management |
| CI/CD | GitHub Actions | N/A | Automated testing |
| Hosting | GitHub Pages | N/A | Documentation & Demo |

### Supporting Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| HTML Reporter | Test results visualization | Playwright built-in |
| Trace Viewer | Debugging failed tests | Playwright built-in |
| LocalStorage | Data persistence | Browser API |
| CSS Variables | Theme management | Native CSS |

## Design Patterns

### 1. Page Object Model (POM)

While not explicitly implemented in the current codebase, tests can be refactored to use POM:

```javascript
// Example POM structure
class TodoPage {
  constructor(page) {
    this.page = page;
    this.taskInput = page.locator('#todo-input');
    this.addButton = page.locator('#add-btn');
    this.taskList = page.locator('#todo-list');
  }

  async addTask(taskText) {
    await this.taskInput.fill(taskText);
    await this.addButton.click();
  }

  async getTaskCount() {
    return await this.taskList.locator('li').count();
  }
}
```

### 2. Test Data Management

Tests use:
- External APIs (jsonplaceholder.typicode.com) for API testing
- Live websites (example.com, playwright.dev) for UI testing
- Sample To-Do app for application-specific testing

### 3. Configuration Management

**Playwright Configuration** (`playwright.config.js`):
```javascript
{
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] }
  ]
}
```

## Data Flow

### Task Creation Flow

```
1. User enters task text
   ↓
2. JavaScript validates input
   ↓
3. Create task object {id, text, completed, createdAt}
   ↓
4. Add to tasks array
   ↓
5. Save to LocalStorage
   ↓
6. Update DOM
   ↓
7. Clear input field
```

### Test Execution Flow

```
1. GitHub Action triggered
   ↓
2. Environment setup
   ↓
3. Playwright test runner starts
   ↓
4. Tests run in parallel across browsers
   ↓
5. Screenshots taken on failure
   ↓
6. Traces captured for debugging
   ↓
7. Results aggregated
   ↓
8. HTML report generated
   ↓
9. Artifacts uploaded to GitHub
```

## Security Considerations

### Application Security

- **XSS Prevention**: HTML escaping in task rendering
- **Input Validation**: Character limit enforcement
- **No Backend**: No server-side vulnerabilities
- **LocalStorage**: Client-side only, no sensitive data

### CI/CD Security

- **Minimal Permissions**: GitHub Actions uses explicit permissions
- **Dependency Scanning**: Automated security checks
- **No Secrets**: No API keys or credentials in code
- **Branch Protection**: PR reviews required

## Performance Considerations

### Application Performance

- **No External Dependencies**: Fast page load
- **LocalStorage**: Instant data persistence
- **CSS Optimization**: Variables and minimal rules
- **No Build Step**: Direct browser execution

### Test Performance

- **Parallel Execution**: Tests run concurrently
- **Browser Reuse**: Contexts shared when possible
- **Selective Testing**: Run only affected tests
- **Retry Logic**: Reduces flaky test impact

## Scalability

### Horizontal Scaling

- Tests can run on multiple CI runners
- Browser contexts enable parallel execution
- Independent test files for better distribution

### Vertical Scaling

- Add more test scenarios easily
- Extend To-Do app features
- Add more documentation pages

## Monitoring & Observability

### Test Monitoring

- **GitHub Actions Dashboard**: Build status
- **HTML Reporter**: Detailed test results
- **Trace Viewer**: Visual debugging
- **Screenshots**: Failure evidence

### Application Monitoring

- Browser console logs
- LocalStorage inspection
- Network tab monitoring (DevTools)

## Future Architecture Enhancements

### Potential Improvements

1. **Backend Integration**
   - Add REST API
   - Database persistence
   - User authentication

2. **Advanced Testing**
   - Visual regression testing
   - Performance testing
   - Load testing

3. **Monitoring**
   - Application Performance Monitoring (APM)
   - Error tracking (e.g., Sentry)
   - Analytics integration

4. **CI/CD Enhancements**
   - Multi-stage pipelines
   - Deployment environments
   - Automated rollback

## Conclusion

This architecture provides a solid foundation for demonstrating software testing practices with Microsoft-centric tools. The modular design allows for easy extension and modification while maintaining simplicity and clarity for educational purposes.
