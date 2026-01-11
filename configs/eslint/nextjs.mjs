import nextVitals from "eslint-config-next/core-web-vitals";

import { config as baseConfig } from "./base.mjs";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...baseConfig,
  ...nextVitals,
  {
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
        internalPattern: ["^@/.*"],
      }],
      "react/no-unescaped-entities": "off",
    },
  },
];
