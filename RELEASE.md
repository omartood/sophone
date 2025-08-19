# Release Process

This project uses automated releases with [semantic-release](https://semantic-release.gitbook.io/).

## How It Works

### Automated Releases
- **Trigger**: Every push to `main` branch
- **Process**: GitHub Actions automatically:
  1. Runs tests
  2. Analyzes commit messages
  3. Determines version bump (patch/minor/major)
  4. Generates changelog
  5. Creates GitHub release
  6. Publishes to npm

### Commit Message Format

Use [Conventional Commits](https://conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: New feature (triggers minor version bump)
- `fix`: Bug fix (triggers patch version bump)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Breaking Changes
Add `BREAKING CHANGE:` in footer or `!` after type to trigger major version bump:

```
feat!: remove deprecated getOldFunction()

BREAKING CHANGE: getOldFunction() has been removed, use getNewFunction() instead
```

## Examples

### Patch Release (0.2.0 → 0.2.1)
```bash
git commit -m "fix: resolve validation issue with international numbers"
```

### Minor Release (0.2.0 → 0.3.0)
```bash
git commit -m "feat: add support for landline numbers"
```

### Major Release (0.2.0 → 1.0.0)
```bash
git commit -m "feat!: redesign API for better usability

BREAKING CHANGE: All function names have been changed to follow new naming convention"
```

## Manual Release (if needed)

```bash
# Dry run to see what would happen
npm run release:dry

# Actual release (only in CI/CD normally)
npm run release
```

## GitHub Secrets Required

For automated releases to work, these secrets must be set in GitHub repository settings:

1. **NPM_TOKEN**: npm authentication token
   - Go to npmjs.com → Access Tokens → Generate new token
   - Copy to GitHub → Settings → Secrets → NPM_TOKEN

2. **GITHUB_TOKEN**: Automatically provided by GitHub Actions

## Release Assets

Each release automatically includes:
- 📦 Package tarball
- 📝 Auto-generated changelog
- 🏷️ Git tag
- 📋 Release notes

## Changelog

The changelog is automatically updated in `CHANGELOG.md` with:
- Version number and date
- Categorized changes (Features, Bug Fixes, etc.)
- Breaking changes highlighted
- Commit links and author credits
