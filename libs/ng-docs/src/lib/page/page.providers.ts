import { ElementRef, InjectionToken, Provider } from '@angular/core';
import { NG_DOCS_SEE_ALSO } from '../utils/tokens/see-also';

export const PAGE_SEE_ALSO = new InjectionToken<readonly string[]>(
  'Page see also'
);

export const PAGE_PROVIDERS: Provider[] = [
  {
    provide: PAGE_SEE_ALSO,
    deps: [ElementRef, NG_DOCS_SEE_ALSO],
    useFactory: seeAlsoProviderFactory,
  },
];

export function seeAlsoProviderFactory(
  { nativeElement }: ElementRef,
  seeAlsoGroups: ReadonlyArray<readonly string[]>
): readonly string[] {
  const groups =
    seeAlsoGroups.filter((group) => group.includes(nativeElement.header)) || [];

  const seeAlsoSet = new Set(
    groups
      .join()
      .split(',')
      .filter((component) => component && component !== nativeElement.header)
  );

  return Array.from(seeAlsoSet);
}
