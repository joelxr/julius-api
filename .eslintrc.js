module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    complexity: [2, 12],
    "max-statements": [2, 35],
    "no-shadow-restricted-names": 2,
    radix: 2,
    "space-infix-ops": 2,
    strict: 0,
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "no-console": "off",
    "no-debugger": "off",
  },
};
