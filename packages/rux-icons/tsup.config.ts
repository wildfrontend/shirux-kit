import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  external: ["react", "react-dom"],
  treeshake: true,
  minify: false,
});
