import { InjectionToken } from '@angular/core';
import { PolymorphicContent } from '@design4pro/ng-polymorphic';
import { DocsSourceCodePathOptions } from '../types/source-code-path-options';

export const DOCS_SOURCE_CODE: InjectionToken<
  PolymorphicContent<DocsSourceCodePathOptions>
> = new InjectionToken<
  PolymorphicContent<DocsSourceCodePathOptions>
>('Source code link', {
  factory: () => '',
});
