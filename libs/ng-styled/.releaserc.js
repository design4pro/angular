const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'ng-styled',
  projectRoot: 'libs/ng-styled',
  buildOutput: 'dist/libs/ng-styled',
});
