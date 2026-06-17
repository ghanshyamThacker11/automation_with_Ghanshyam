const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  pageTitle: 'BDD Test Report',
  reportName: 'BDD Automation Report',
  displayDuration: true,
  openReportInBrowser: false,
});