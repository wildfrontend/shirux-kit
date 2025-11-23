# @shirux/types

Shared TypeScript type definitions for Ruxelu projects.

## Installation

This package is published as a private GitHub package. To install:

### 1. Configure npm to use GitHub Package Registry

Create or update `.npmrc` in your project root:

```
@shirux:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Set your GitHub token

Create a GitHub Personal Access Token with `read:packages` permission:
- Go to https://github.com/settings/tokens
- Generate new token (classic)
- Select `read:packages` scope
- Copy the token

Set the token as an environment variable:

```bash
export GITHUB_TOKEN=your_token_here
```

### 3. Install the package

```bash
pnpm add @shirux/types
```

## Usage

### React Types

```typescript
import type { RC, RCC } from '@shirux/types/react';

// React Component
const MyComponent: RC<{ name: string }> = ({ name }) => {
  return <div>{name}</div>;
};

// React Component with Children
const MyContainer: RCC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

### Global Types

The package also exports global type aliases that can be used without imports:

```typescript
// These are available globally after installing the package
const MyComponent: RC<Props> = (props) => { /* ... */ };
const MyContainer: RCC<Props> = (props) => { /* ... */ };
```

## Development

### Build

```bash
pnpm run build
```

### Publish

Publishing is automated via GitHub Actions when changes are pushed to the `main` branch.

To manually trigger a publish:
1. Go to the Actions tab in GitHub
2. Select "Publish @shirux/types"
3. Click "Run workflow"

## Version Updates

When updating types, remember to bump the version in `package.json`:

```bash
cd packages/types
npm version patch  # or minor, major
```

Then commit and push the changes to trigger automatic publishing.
