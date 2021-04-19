module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['warn', 'always'],
    'semi': ['warn', 'never'],
    'no-console': ['warn', { 'allow': ['error'] }],
    'no-useless-escape': ['off']
  }
} 
