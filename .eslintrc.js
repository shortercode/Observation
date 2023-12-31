module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
    'tsconfigRootDir': __dirname,
    'project': ['./tsconfig.json'],
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // match const global primitives and ensure they use UPPER_CASE
      {
        selector: ['variable'],
        modifiers: ['const', 'global'],
        types: ['boolean', 'string', 'number', 'array'],
        format: ['UPPER_CASE'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      // match const global complex values and ensure they use PascalCase or snake_case
      {
        selector: ['variable'],
        modifiers: ['const', 'global'],
        format: ['UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      // allow any case for destructured variables, to allow greater compatibility
      // with other libraries which may use other formats
      {
        selector: ['variable'],
        modifiers: ['destructured'],
        format: null,
      },
      // all other variables should be snake_case
      {
        selector: ['variableLike'],
        format: ['snake_case'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      // ensure static methods and members are PascalCase
      {
        selector: ['memberLike'],
        modifiers: ['static'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      // ensure types are PascalCase
      {
        selector: ['typeLike'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: ['parameter'],
        modifiers: ['unused'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
        trailingUnderscore: 'forbid'
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' },
    ],
    'curly': 'error',
  }
};
