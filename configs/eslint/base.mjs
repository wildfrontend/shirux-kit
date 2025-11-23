import js from "@eslint/js";
import onlyWarn from "eslint-plugin-only-warn";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
      prettier: eslintPluginPrettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "prettier/prettier": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  {
    // Disable type-aware linting for config files
    files: ["**/*.config.{js,mjs,cjs,ts,mts,cts}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
];
