const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'angular-jss',
  projectRoot: 'packages/angular-jss',
  buildOutput: 'dist/packages/angular-jss',
});
