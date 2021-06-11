module.exports = {
  extends: 'stylelint-config-standard',
  context: './resources/assets',
  failOnError: false,
  files: ['**/*.scss'],
  quiet: false,
  syntax: 'scss',
  rules: {
    'no-empty-source': null,
    'string-quotes': 'double',
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen',
        ],
      },
    ],
    'no-descending-specificity': null
  },
};