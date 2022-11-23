import { InjectionToken } from '@angular/core';

export const DOCS_DEFAULT_TABS = new InjectionToken<readonly string[]>(
  'Array of default tab names',
  {
    factory: () => [],
  }
);
