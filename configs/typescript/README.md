# `@shirux/typescript-config`

Shared TypeScript configuration for the workspace.

## Configs

| Config | 用途 | 說明 |
|--------|------|------|
| `base.json` | 基礎設定 | ESNext + bundler resolution |
| `node.json` | Node.js apps | NodeNext + noEmit（MCPs 使用） |
| `nextjs.json` | Next.js apps | next plugin + jsx: preserve + noEmit |
| `react-library.json` | React libraries | bundler + jsx: preserve |

## Usage

```json
// React library (packages/famosu-ui, etc.)
{
  "extends": "@shirux/typescript-config/react-library.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}

// Node.js app (mcps/*)
{
  "extends": "@shirux/typescript-config/node.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}

// Next.js app (apps/*)
{
  "extends": "@shirux/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
