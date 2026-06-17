module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/step-definitions/**/*.ts'],
    paths: ['tests/features/**/*.feature'],
    format: ['progress', 'json:reports/cucumber-report.json']
  }
};