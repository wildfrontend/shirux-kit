# `@shirux/eslint-config`

Shared ESLint flat config presets for the workspace.

## Exports

- `@shirux/eslint-config/base`
- `@shirux/eslint-config/react-library`
- `@shirux/eslint-config/nextjs`

## Usage

Base or React library:

```js
import { config } from "@shirux/eslint-config/react-library";

export default config;
```

Next.js app:

```js
import { config } from "@shirux/eslint-config/nextjs";

export default config;
```

## Notes

- Includes Prettier integration and import sorting (warn level).
- Config files (`*.config.*`) disable type-aware linting by default.
