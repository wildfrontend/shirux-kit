# shirux-kit


## KPI / 產能報告規則
- 產能量化與報告格式：`agents/reports/kpi.md`


## Project Structure

```
shirux-kit/
├── apps/
│   └── shirux-storybook/     # Component showcase and documentation (Next.js)
├── packages/
│   ├── rux-ui/            # UI component library
│   ├── rux-icons/         # Icon component library
│   └── types/             # Shared TypeScript types
└── configs/
    ├── eslint/            # Shared ESLint configuration
    ├── prettier/          # Shared Prettier configuration
    └── typescript/        # Shared TypeScript configuration
```

## Available Scripts

### Development
```bash
# Start Storybook development server
pnpm dev:storybook

# Build all packages
pnpm build
```

### Linting & Formatting
```bash
# Run linter on all packages
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

### Package-Specific Commands

#### Icons Package
```bash
# Generate icon components from SVG assets
pnpm --filter @shirux/rux-icons generate

# Build icons package (generate + create index files)
pnpm --filter @shirux/rux-icons build
```

#### UI Package
```bash
# Lint UI components
pnpm --filter @shirux/rux-ui lint

# Fix linting issues in UI package
pnpm --filter @shirux/rux-ui lint:fix
```

#### Storybook
```bash
# Build Storybook for production
pnpm --filter shirux-storybook build

# Deploy to Firebase
pnpm --filter shirux-storybook deploy
```
