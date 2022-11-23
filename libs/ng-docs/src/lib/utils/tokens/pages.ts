import { InjectionToken } from '@angular/core';
import { DocsPages } from '../types/page';

export const DOCS_PAGES: InjectionToken<DocsPages> =
  new InjectionToken<DocsPages>('Documentation pages', {
    factory: () => [],
  });
