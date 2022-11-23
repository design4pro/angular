import { InjectionToken } from '@angular/core';

export const DOCS_TITLE = new InjectionToken<string>('Page title', {
  factory: () => '',
});
