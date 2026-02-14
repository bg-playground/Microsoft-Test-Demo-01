# Security Policy

## Supported Versions

This project is a demonstration/portfolio project. The latest version on the `main` branch is supported.

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| other   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

### How to Report

1. **DO NOT** create a public GitHub issue
2. Send an email to the repository maintainer or use GitHub's private vulnerability reporting feature
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Best effort

## Security Best Practices

### For Contributors

When contributing to this project:

1. **Never commit secrets**
   - No API keys, tokens, or passwords
   - Use environment variables for sensitive data
   - Check `.gitignore` before committing

2. **Dependencies**
   - Keep dependencies up to date
   - Review security advisories
   - Use `npm audit` regularly

3. **Code Review**
   - All changes require review
   - Security-sensitive changes need extra scrutiny
   - Follow the contributing guidelines

### Security Features Enabled

This repository uses:

- ✅ **Dependabot**: Automated dependency updates
- ✅ **CodeQL**: Automated security scanning
- ✅ **Branch Protection**: Prevents direct pushes to main
- ✅ **Explicit Permissions**: GitHub Actions uses minimal permissions
- ✅ **No Secrets in Code**: All sensitive data externalized

## Security Scanning

### Automated Scans

- **CodeQL Analysis**: Runs on every push and PR
- **Dependency Scanning**: Dependabot alerts enabled
- **Secret Scanning**: GitHub secret scanning enabled

### Manual Testing

Before contributing:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically if possible
npm audit fix

# Update packages
npm update

# Test after updates
npm test
```

## Known Security Considerations

### Application Security

1. **XSS Prevention**
   - HTML content is escaped using `textContent`
   - No `innerHTML` with user input
   - Safe DOM manipulation practices

2. **LocalStorage**
   - Client-side only storage
   - No sensitive data stored
   - Data sanitized before storage

3. **No Backend**
   - Pure frontend application
   - No server-side vulnerabilities
   - No database security concerns

### CI/CD Security

1. **GitHub Actions**
   - Explicit minimal permissions
   - No secret exposure
   - Controlled artifact uploads

2. **Third-Party Actions**
   - Only official GitHub actions used
   - Pinned to specific versions
   - Regularly reviewed and updated

## Dependency Management

### Current Dependencies

```json
{
  "@playwright/test": "^1.41.0"
}
```

### Security Updates

- Dependencies are reviewed monthly
- Critical updates applied immediately
- Breaking changes tested thoroughly

## Compliance

This project follows:

- **OWASP Top 10**: Web application security risks
- **WCAG 2.1**: Accessibility guidelines
- **GitHub Security Best Practices**
- **Secure SDLC**: Security in every phase

## Security Checklist

Before releasing changes:

- [ ] No secrets committed
- [ ] Dependencies updated
- [ ] Security scan passed (CodeQL)
- [ ] No known vulnerabilities
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation updated

## Contact

For security concerns, use GitHub's private vulnerability reporting or contact the repository maintainer through GitHub.

---

**Last Updated**: February 2024  
**Version**: 1.0
