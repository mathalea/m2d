// cf https://dev.to/itmayziii/typescript-eslint-and-standardjs-5hmd (un peu vieux, mais donne une base)
module.exports = {
  // root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [{
    files: ['*.ts'],
    extends: [
      'plugin:@typescript-eslint/recommended', // Out of the box Typescript rules
      'standard' // Out of the box StandardJS rules
    ],
    parserOptions: {
      // cf https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject
      project: './tsconfig.json' // Required to have rules that rely on Types.
      //   'tsconfigRootDir': './'
    }
  }, {
    files: ['*.js'],
    extends: [
      'standard' // Out of the box StandardJS rules
    ]
  }]
}
