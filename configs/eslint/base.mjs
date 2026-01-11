import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      onlyWarn,
      perfectionist,
      "unused-imports": unusedImports,
    },
    rules: {
      "perfectionist/sort-imports": ["warn", {
        groups: [
          "side-effect",
          "side-effect-style",
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
      }],
      "perfectionist/sort-named-imports": ["warn", {
        type: "natural",
        order: "asc",
      }],
      "perfectionist/sort-jsx-props": ["warn", {
        type: "alphabetical",
        order: "asc",
      }],
      "@typescript-eslint/consistent-type-imports": ["warn", {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      }],
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
  eslintConfigPrettier,
];
