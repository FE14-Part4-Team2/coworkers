import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactPerf from "eslint-plugin-react-perf";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  ...compat.extends(
    "plugin:@typescript-eslint/strict",
    "plugin:react-perf/recommended",
    "plugin:prettier/recommended",
  ),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      prettier,
      react,
      "react-hooks": reactHooks,
      "react-perf": reactPerf,
    },
    rules: {
      "prettier/prettier": "error",
      "prefer-arrow-callback": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/destructuring-assignment": ["warn", "always"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": "off",
      "react-perf/jsx-no-new-function-as-prop": "off"
    },
  },
];
