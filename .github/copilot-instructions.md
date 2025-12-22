# GitHub Copilot Instructions

## Critical Branching Strategy

**NEVER commit directly to `dev` or `main` branches.**

### Branch Protection Rules

1. **Protected Branches**: `dev` and `main`
   - NO direct commits allowed
   - NO direct pushes allowed
   - ALL changes MUST go through Pull Requests

2. **Development Workflow**:
   ```
   feature/fix branch → PR → dev → PR → main
   ```

3. **Creating Changes**:
   - Always create a new branch from `dev`
   - Branch naming conventions:
     - `feat/feature-name` - New features
     - `fix/bug-name` - Bug fixes
     - `chore/task-name` - Maintenance tasks
     - `perf/optimization-name` - Performance improvements
     - `docs/documentation-name` - Documentation updates

4. **Merge Requirements**:
   - Feature/fix branches MUST pass ALL CI/CD checks
   - Pull Request MUST be created to merge into `dev`
   - Code review may be required (check repository settings)
   - CI/CD pipeline includes:
     - Security scanning (pnpm audit, Gitleaks, Trivy, OWASP)
     - Linting (ESLint)
     - Unit tests
     - E2E tests (Desktop, Mobile Chrome, Mobile Safari)
     - Accessibility tests
     - Performance tests
     - Build validation

5. **Branch Purposes**:
   - `main`: Production-ready code only
   - `dev`: Central development branch (staging)
   - `feature/*`, `fix/*`, etc.: Active development

### Example Workflow

```bash
# 1. Start from dev
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feat/new-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 4. Push branch
git push -u origin feat/new-feature

# 5. Create PR to dev
gh pr create --base dev --title "feat: add new feature" --body "Description"

# 6. Wait for CI/CD checks to pass

# 7. Merge PR (via GitHub UI or after approval)

# 8. Delete feature branch after merge
git branch -d feat/new-feature
git push origin --delete feat/new-feature
```

### DO NOT

- ❌ `git commit` on `dev` branch
- ❌ `git commit` on `main` branch
- ❌ `git push origin dev`
- ❌ `git push origin main`
- ❌ Skip CI/CD checks
- ❌ Merge PRs with failing tests

### ALWAYS

- ✅ Create a new branch for every change
- ✅ Ensure all CI/CD checks pass
- ✅ Create Pull Request to merge into `dev`
- ✅ Follow conventional commit messages
- ✅ Wait for CI/CD validation before merging
- ✅ Keep commits atomic and focused

## Repository Structure

- **Development**: Work happens on feature/fix branches
- **Integration**: Changes merge to `dev` via PR
- **Production**: Stable releases merge from `dev` to `main` via PR

This workflow ensures:
- Code quality through automated checks
- Proper review process
- Traceability of changes
- Rollback capability
- Protected production environment
