# Testing & QA Documentation

## Overview
This project implements comprehensive testing and quality assurance with:
- **Unit Tests** (Vitest + React Testing Library)
- **E2E Tests** (Playwright)
- **Accessibility Tests** (Axe-core, WCAG 2.1 AA)
- **Performance Monitoring** (Web Vitals)
- **CI/CD Pipeline** (GitHub Actions + Coveralls)

## CI/CD Pipeline

All feature branches **must pass** the CI pipeline before merging to `dev`:

### Automated Checks on Every PR:
1. ✅ **Lint & Type Check** - ESLint + TypeScript compilation
2. ✅ **Unit Tests** - All component tests with coverage
3. ✅ **E2E Tests** - Chromium, Firefox, WebKit
4. ✅ **Accessibility** - WCAG 2.1 AA compliance
5. ✅ **Performance** - Core Web Vitals validation
6. ✅ **Build** - Production build verification

**Coverage Reports:** Automatically uploaded to [Coveralls](https://coveralls.io/github/diiegg/liza.coach)

See [Branch Protection Setup](.github/BRANCH_PROTECTION.md) for configuration details.

## Test Structure

```
tests/
├── setup.ts                    # Test configuration
├── unit/                       # Unit tests
│   ├── Hero.test.tsx
│   └── ServiceCard.test.tsx
└── e2e/                        # End-to-end tests
    ├── homepage.spec.ts        # Homepage functionality
    ├── accessibility.spec.ts   # WCAG 2.1 AA compliance
    └── performance.spec.ts     # Performance metrics
```

## Running Tests

### Unit Tests
```bash
# Run unit tests
pnpm test

# Run with UI
pnpm test:ui

# Run with coverage
pnpm test:coverage
```

### E2E Tests
```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e:debug

# Specific test suites
pnpm test:accessibility
pnpm test:performance
```

### All Tests
```bash
pnpm test:all
```

## Accessibility Testing

### WCAG 2.1 AA Compliance
The site is tested for:
- ✅ Color contrast (minimum 4.5:1 for normal text, 3:1 for large text)
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ Proper heading hierarchy
- ✅ Form labels and ARIA attributes
- ✅ Image alt text
- ✅ Skip to content link
- ✅ Focus indicators
- ✅ Language attributes

### Tools Used
- **Axe-core**: Automated accessibility testing
- **@axe-core/playwright**: E2E accessibility tests
- **Manual testing**: Keyboard navigation and screen readers

## Performance Monitoring

### Core Web Vitals
Monitored metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Real-time Monitoring
The `WebVitals` component tracks performance in production:
- Sends metrics to Google Analytics
- Logs to console in development
- Tracks all Core Web Vitals automatically

## CI/CD Integration

### GitHub Actions (Recommended)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
      - run: pnpm test:accessibility
```

## Test Coverage Goals

- **Unit Tests**: > 80% coverage
- **E2E Tests**: All critical user paths
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **Performance**: All Core Web Vitals in "Good" range

## Writing New Tests

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('should navigate correctly', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="#section"]');
  await expect(page.locator('#section')).toBeInViewport();
});
```

## Debugging

### Unit Tests
```bash
# Run specific test file
pnpm test Hero.test.tsx

# Watch mode
pnpm test --watch
```

### E2E Tests
```bash
# Debug mode with inspector
pnpm test:e2e:debug

# Run specific test
pnpm test:e2e tests/e2e/homepage.spec.ts

# Headed mode (see browser)
pnpm test:e2e --headed
```

## Best Practices

1. **Write tests alongside features**
2. **Test user behavior, not implementation**
3. **Keep tests independent and isolated**
4. **Use meaningful test descriptions**
5. **Mock external dependencies**
6. **Test accessibility from the start**
7. **Monitor performance continuously**
8. **Run tests before committing**

## Known Issues & Limitations

- Playwright requires browsers to be installed: `npx playwright install`
- Video tests may be flaky due to autoplay policies
- Performance tests can vary based on system load

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
