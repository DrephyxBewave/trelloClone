module.exports = {
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['production', 'staging'].includes(process.env.NODE_ENV) ? 'error' : 'off',
    'no-debugger': ['production', 'staging'].includes(process.env.NODE_ENV) ? 'error' : 'off',
    'no-unused-vars': ['production', 'staging'].includes(process.env.NODE_ENV) ? 'error' : 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'max-len': [
      'error',
      {
        code: 120
      },
    ],
    'object-curly-newline': ['error', { consistent: true }],
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'no-lone-blocks': ['error'],
    'no-multi-spaces': ['error'],
    'no-return-await': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-useless-return': ['error'],
    'no-var': ['error'],
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'function-paren-newline': ['error', 'consistent'],
  },
};
