module.exports = {
  extends: 'stylelint-config-standard',
  overrides: [
    {
      files: ['**/*.scss', '**/*.sass','**/*.less', '**/*.css'],
      rules: {
        'no-descending-specificity': null
      }
    }
  ]
}
