import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import alias from "@rollup/plugin-alias";
import path from "path";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: ["app/renderer.ts"],
    output: {
      dir: "public/build",
      format: "esm", // or "iife" for a self-executing function, suitable for <script> tags
      sourcemap: true,
    },
    plugins: [
      commonjs({
        browser: true,
      }),
      nodeResolve({
        preferBuiltins: false,
        browser: true,
      }),
      builtins(), // Polyfill Node.js core modules
      globals(), // Injects global variables that Node.js core modules might rely on
      svelte({
        css: (css) => {
          css.write("index.css");
        },
        preprocess: autoPreprocess(),
      }),
      alias({
        entries: [
          {
            find: "@components",
            replacement: path.resolve(
              projectRootDir,
              "app/components"
            ),
          },
        ],
      }),
      json(),
      typescript(),
    ],
    // Make sure any necessary modules are properly externalized
    external: [
      // You can add specific modules here that shouldn't be bundled
    ],
  },
];
