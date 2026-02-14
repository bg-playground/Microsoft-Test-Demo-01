# Microsoft Test Demo 01

[![Playwright Tests](https://github.com/bg-playground/Microsoft-Test-Demo-01/actions/workflows/playwright.yml/badge.svg)](https://github.com/bg-playground/Microsoft-Test-Demo-01/actions/workflows/playwright.yml)

A comprehensive demonstration of the software testing lifecycle using **Microsoft-centric tools and technologies**. This repository showcases best practices across all testing phases: Test Planning, Test Case Development, Test Environment Preparation, Test Execution, Test Results Analysis, and Results Reporting.

## Overview

This project demonstrates a complete testing approach leveraging Microsoft's ecosystem, including **Playwright for Testing**, **Azure DevOps**, **Azure Pipelines**, **Azure Test Plans**, **Power BI**, **Azure AI**, and **GitHub Copilot**. It includes both automated and manual testing examples, along with a sample To-Do application to serve as the application under test.

## Testing Lifecycle Stages

### 1. Test Planning
- **Tools:** Azure Test Plans, Azure DevOps Boards
- Strategic test planning documents defining scope, objectives, and resources
- Risk assessment and mitigation strategies
- Located in: `/docs/test-plan.md`

### 2. Test Case Development
- **Tools:** Azure Test Plans, Visual Studio Code, GitHub Copilot
- Comprehensive manual test cases designed for Azure Test Plans execution
- Automated test scripts written with Microsoft Playwright
- Located in: `/manual-tests/test-cases.md` and `/tests/`

### 3. Test Environment Preparation
- **Tools:** Azure Virtual Machines, Azure DevOps Environments
- Consistent, reproducible test environments using Azure infrastructure
- Configuration management for multi-browser testing
- Configured in: `playwright.config.js`

### 4. Test Execution
- **Tools:** Playwright Test Runner, Azure Pipelines, GitHub Actions
- Automated test execution across multiple browsers (Chromium, Firefox, WebKit)
- CI/CD integration for continuous testing
- Parallel test execution for faster feedback
- Run with: `npm test`

### 5. Test Results Analysis
- **Tools:** Playwright HTML Reporter, Azure DevOps Analytics
- Detailed test reports with screenshots and traces
- Failure analysis with automatic retries for flaky tests
- View reports with: `npm run test:report`

### 6. Results Reporting
- **Tools:** Power BI, Azure DevOps Dashboards
- Rich visualizations and dashboards for stakeholder communication
- Trend analysis and quality metrics tracking
- Integration with Azure DevOps work items

## AI in Testing

This demonstration incorporates **AI-powered testing** approaches:

- **GitHub Copilot:** AI-assisted test creation and code generation
- **Azure AI:** Intelligent test data generation and validation
- **Azure Machine Learning:** Predictive analytics for test optimization and defect prediction
- **Copilot in Azure DevOps:** Natural language test case creation

## Directory Structure

```
Microsoft-Test-Demo-01/
├── README.md                          # This file
├── package.json                       # Node.js dependencies and scripts
├── playwright.config.js               # Playwright configuration (multi-browser)
├── .gitignore                         # Git ignore rules
├── .github/
│   └── workflows/
│       └── playwright.yml             # GitHub Actions CI workflow
├── src/
│   ├── index.html                     # Sample To-Do app (application under test)
│   └── styles.css                     # App styling
├── tests/
│   ├── example.spec.js                # Basic Playwright test
│   ├── navigation.spec.js             # Navigation tests
│   ├── form-validation.spec.js        # Form interaction tests
│   ├── accessibility.spec.js          # Accessibility checks
│   └── api.spec.js                    # API testing examples
├── automated-tests/
│   └── high-level-notes.md            # Automation framework notes (Microsoft-centric)
├── manual-tests/
│   ├── README.md                      # Manual testing overview
│   └── test-cases.md                  # Detailed manual test cases for Azure Test Plans
└── docs/
    ├── README.md                      # Documentation overview
    └── test-plan.md                   # Comprehensive test plan
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bg-playground/Microsoft-Test-Demo-01.git
   cd Microsoft-Test-Demo-01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

```bash
# Run all tests (headless mode)
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# View last test report
npm run test:report
```

### Running the Sample App

Open `src/index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js (if http-server is installed)
npx http-server src -p 3000
```

Then navigate to `http://localhost:3000`

## Tools & Technologies

### Microsoft Testing Tools
- **Playwright for Testing** - Modern end-to-end testing framework
- **Azure DevOps** - Complete DevOps lifecycle management
- **Azure Pipelines** - CI/CD automation
- **Azure Test Plans** - Manual and exploratory testing
- **Power BI** - Test results visualization and reporting
- **Azure AI & Azure ML** - AI-powered testing and analytics
- **GitHub Copilot** - AI-assisted test development

### Development Tools
- **Visual Studio Code** - Primary IDE
- **GitHub Actions** - CI/CD workflows
- **Node.js** - Runtime environment

### Testing Capabilities
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Parallel test execution
- ✅ Automatic screenshots on failure
- ✅ Test traces for debugging
- ✅ Retry mechanism for flaky tests
- ✅ API testing
- ✅ Accessibility testing
- ✅ CI/CD integration

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Ensure all tests pass before submitting a PR:
```bash
npm test
```

## License

This project is licensed under the MIT License.

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops)
- [Azure Test Plans](https://azure.microsoft.com/services/devops/test-plans)
- [Power BI](https://powerbi.microsoft.com)
- [GitHub Copilot](https://github.com/features/copilot)
