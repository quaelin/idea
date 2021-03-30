module.exports = {
  extends: ['eslint-config-airbnb-base'],

  rules: {
    camelcase: 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-console': 'off',
    'no-multi-assign': 'off',
    'no-param-reassign': 'warn',
    'no-restricted-syntax': 'warn',
    'object-curly-newline': ['error', { multiline: true }],
    'prefer-rest-params': 'off',
  },
};
