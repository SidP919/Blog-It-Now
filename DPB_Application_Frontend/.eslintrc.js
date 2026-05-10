module.exports = {
  root: true,
  extends: '@react-native',
  globals: {
    sessionStorage: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
