# Setup Guide for sophone

## 🚀 Publishing to NPM

### Prerequisites

1. Make sure you have an npm account at https://npmjs.com
2. Verify your email address on npm

### Publishing Steps

1. **Login to npm:**

   ```bash
   npm login
   ```

   Enter your npm username, password, email, and 2FA code if enabled.

2. **Verify login:**

   ```bash
   npm whoami
   ```

3. **Run final tests:**

   ```bash
   npm test
   ```

4. **Publish the package:**
   ```bash
   npm publish
   ```

## 🔧 GitHub Actions Setup

### Required Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **NPM_TOKEN**:
   - Go to https://www.npmjs.com/settings/tokens
   - Create a new "Automation" token
   - Copy the token and add it as `NPM_TOKEN` secret

### Automated Workflows

1. **CI (Continuous Integration)**: Runs on every push/PR

   - Tests on Node.js 16, 18, 20
   - Validates CLI commands
   - Checks package can be built

2. **Publish**: Runs when you create a GitHub release

   - Automatically publishes to npm
   - Uploads package tarball to GitHub release

3. **Version Bump**: Manual workflow for version management
   - Go to Actions → Version Bump → Run workflow
   - Choose patch/minor/major
   - Creates new version and GitHub release

## 📋 Release Process

### Option 1: Manual Release

```bash
# Bump version
npm version patch  # or minor/major

# Push with tags
git push --follow-tags

# Create GitHub release manually
```

### Option 2: Automated Release (Recommended)

1. Go to GitHub Actions
2. Run "Version Bump" workflow
3. Choose version type (patch/minor/major)
4. Workflow will:
   - Run tests
   - Bump version
   - Create GitHub release
   - Trigger automatic npm publish

## 🎯 Post-Publication

After publishing, your package will be available:

- **npm**: `npm install sophone`
- **CLI**: `npm install -g sophone`
- **GitHub**: https://github.com/omartood/sophone
- **npm page**: https://www.npmjs.com/package/sophone

## 📊 Package Stats

- **Size**: 6.0 kB compressed, 21.5 kB unpacked
- **Tests**: 36 comprehensive tests
- **Functions**: 24 total functions
- **CLI Commands**: 8 commands
- **TypeScript**: Full type definitions included
