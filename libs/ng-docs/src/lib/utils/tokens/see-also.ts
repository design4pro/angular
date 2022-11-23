import { InjectionToken } from '@angular/core';

export const DOCS_SEE_ALSO = new InjectionToken<
  ReadonlyArray<readonly string[]>
>('Array of arrays of related pages', {
  factory: () => [],
});
