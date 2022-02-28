const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'angular-jss',
  projectRoot: 'libs/angular-jss',
  buildOutput: 'dist/libs/angular-jss',
});
