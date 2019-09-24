/* eslint-env node */
/* eslint no-unused-vars: [ "error", { "varsIgnorePattern": "off|warn|error" } ] */

const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  'plugins': [
    'react',
    'react-hooks',
  ],

  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': { 'jsx': true },
  },

  'settings': {
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    'react': {
      'createClass': 'createReactClass',
      'pragma': 'React',
      'version': 'detect',
    },
  },

  'rules': {
    // https://eslint.org/docs/rules/#best-practices
    'curly': [ error, 'multi-line' ],
    'eqeqeq': [ error, 'always', { 'null': 'ignore' } ],
    'no-implied-eval': error,
    'no-eval': error,

    // https://eslint.org/docs/rules/#stylistic-issues
    'array-bracket-newline': [ warn, 'consistent' ],
    'block-spacing': [ warn, 'always' ],
    'brace-style': [ warn, '1tbs' ],
    'comma-dangle': [ warn, 'always-multiline' ],
    'comma-spacing': warn,
    'comma-style': warn,
    'indent': [ warn, 2 ],
    'jsx-quotes': [ warn, 'prefer-double' ],
    'quotes': [ warn, 'single' ],
    'semi': [ warn, 'always' ],
    'semi-spacing': warn,
    'semi-style': warn,
    'space-unary-ops': warn,
    'space-infix-ops': warn,
    'unicode-bom': warn,

    'react-hooks/rules-of-hooks': error,
    'react-hooks/exhaustive-deps': error,
  },
};
