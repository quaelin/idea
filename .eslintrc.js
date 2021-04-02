module.exports = {
  extends: ['eslint-config-airbnb-base', 'plugin:jest/recommended'],

  plugins: ['lodash', 'jest'],

  env: { 'jest/globals': true },

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

    'lodash/callback-binding': 'error',
    'lodash/collection-method-value': 'error',
    'lodash/collection-return': 'error',
    'lodash/identity-shorthand': 'error',
    'lodash/matches-prop-shorthand': 'error',
    'lodash/matches-shorthand': ['error', 'always', 3, true],
    'lodash/no-commit': 'error',
    'lodash/no-double-unwrap': 'error',
    'lodash/no-extra-args': 'error',
    'lodash/no-unbound-this': 'error',
    'lodash/prefer-compact': 'error',
    'lodash/prefer-flat-map': 'error',
    'lodash/prefer-map': 'error',
    'lodash/prefer-reject': 'error',
    'lodash/prefer-thru': 'error',
    'lodash/prefer-wrapper-method': 'error',
    'lodash/prop-shorthand': 'error',
    'lodash/unwrap': 'error',

    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'expectCid', 'expectTypeError'] },
    ],
    'jest/no-hooks': ['error', { allow: ['afterEach'] }],
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-have-length': 'error',
  },
};
