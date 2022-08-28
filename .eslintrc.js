module.exports = {
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-throw-literal': 0,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
  ],
};
