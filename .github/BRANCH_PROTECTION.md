# Branch Protection Setup

## Required Setup Steps

### 1. Add Coveralls Repository Token

1. Go to [Coveralls.io](https://coveralls.io/)
2. Sign in with GitHub
3. Add your repository: `diiegg/liza.coach`
4. Copy your **COVERALLS_REPO_TOKEN**
5. Go to GitHub: Settings → Secrets and variables → Actions
6. Add new secret: `COVERALLS_REPO_TOKEN` with your token

### 2. Enable Branch Protection Rules

Go to: **Settings → Branches → Branch protection rules**

#### For `dev` branch:

✅ **Require a pull request before merging**
- Require approvals: 0 (or 1 if you want review)
- Dismiss stale pull request approvals when new commits are pushed

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Status checks required:
  - ✓ Lint & Type Check
  - ✓ Unit Tests & Coverage
  - ✓ E2E Tests (Playwright) - chromium
  - ✓ E2E Tests (Playwright) - firefox
  - ✓ E2E Tests (Playwright) - webkit
  - ✓ Accessibility Tests (WCAG 2.1 AA)
  - ✓ Performance Tests
  - ✓ Build Verification
  - ✓ All Checks Passed ✓

✅ **Require conversation resolution before merging**

✅ **Do not allow bypassing the above settings**

#### For `main` branch:

Same as `dev` branch + additional rules:
- Require pull request from `dev` branch only
- Require at least 1 approval

## Workflow Triggers

The CI pipeline runs on:
- Every push to `dev` or `main`
- Every pull request targeting `dev` or `main`

## What Gets Tested

### 1. Lint & Type Check
- ESLint validation
- TypeScript compilation
- Build verification

### 2. Unit Tests (Vitest)
- Component tests
- Hook tests
- Coverage report (uploaded to Coveralls)
- Minimum coverage: tracks trends

### 3. E2E Tests (Playwright)
- Runs on 3 browsers: Chromium, Firefox, WebKit
- Homepage functionality
- Mobile responsiveness
- Navigation flows

### 4. Accessibility Tests
- WCAG 2.1 AA compliance
- Color contrast validation
- Keyboard navigation
- ARIA attributes
- Screen reader compatibility

### 5. Performance Tests
- Page load time < 3s
- LCP < 2.5s
- JS bundle size < 500KB
- Core Web Vitals monitoring

### 6. Build Verification
- Production build succeeds
- Static export works
- No build errors or warnings

## Artifacts

All test runs generate artifacts (retained for 30 days):
- Coverage reports
- Playwright traces (on failure)
- Playwright videos
- Performance metrics
- Build output

## Merge Requirements

**To merge any feature branch → dev:**
1. All 6 jobs must pass ✅
2. Branch must be up to date
3. No merge conflicts

**Merge blocked if:**
- Any test fails ❌
- Build fails ❌
- Linting errors ❌
- Type errors ❌
- Coverage drops significantly ❌

## Local Development

Before pushing, run locally:
```bash
# Quick check
pnpm lint
pnpm build

# Run all tests
pnpm test:all

# Coverage report
pnpm test:coverage
```

## Troubleshooting

### Pipeline fails but works locally?
- Check Node.js version (20.x in CI)
- Check pnpm version (10.x in CI)
- Clear cache: `pnpm store prune`

### Playwright tests fail?
- Check browser compatibility
- View traces in GitHub Actions artifacts
- Run locally: `pnpm test:e2e:debug`

### Coverage upload fails?
- Verify `COVERALLS_REPO_TOKEN` is set
- Check Coveralls service status

## Coverage Badge

Add to README.md:
```markdown
[![Coverage Status](https://coveralls.io/repos/github/diiegg/liza.coach/badge.svg?branch=dev)](https://coveralls.io/github/diiegg/liza.coach?branch=dev)
```
