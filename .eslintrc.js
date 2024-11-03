module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "boundaries"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:boundaries/strict",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      {
        type: "app",
        pattern: "src/app",
      },
      {
        type: "entities",
        pattern: "src/domain/entities",
      },
      {
        type: "usecases",
        pattern: "src/domain/usecases",
      },
    ],
    "boundaries/ignore": [
      "*.*", // ignore top level config files
      "src/fixtures/**",
      "**/*.spec.ts",
    ],
  },
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "disallow",
        rules: [
          {
            from: "usecases",
            allow: ["entities"],
          },
          {
            from: "app",
            allow: ["entities", "usecases"],
          },
        ],
      },
    ],
    "boundaries/external": [
      2,
      {
        // disallow all external imports by default
        default: "disallow",
        rules: [
          {
            from: "*",
            allow: ["remeda", "seedrandom"],
          },
          {
            from: "app",
            allow: "*",
          },
        ],
      },
    ],
  },
};
