import { InjectionToken } from '@angular/core';
import { identity } from 'rxjs';
import { DocsHandler } from '../types/handler';

export const NG_DOCS_EXAMPLE_CONTENT_PROCESSOR: InjectionToken<
  DocsHandler<Record<string, string>, Record<string, string>>
> = new InjectionToken('Processes content in example', {
  factory: () => identity,
});
