module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['standard', 'prettier', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],

  rules: {
    'prettier/prettier': 'error',
  },
};
