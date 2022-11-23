const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'ng-docs',
  projectRoot: 'libs/ng-docs',
  buildOutput: 'dist/libs/ng-docs',
});
