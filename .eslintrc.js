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
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],

  rules: {
    'prettier/prettier': 'error',
  },
};
