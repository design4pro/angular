import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { isPresent } from '../utils/miscellaneous/is-present';
import { DestroyService } from '../utils/service/destroy.service';
import { NG_DOCS_PAGES } from '../utils/tokens/pages';
import { NG_DOCS_TITLE } from '../utils/tokens/title';
import { NgDocsPages } from '../utils/types/page';

export const NAVIGATION_TITLE = new InjectionToken<Observable<string>>(
  'Page title'
);
export const NAVIGATION_LABELS = new InjectionToken<readonly string[]>(
  'Navigation sections labels for search'
);
export const NAVIGATION_ITEMS: InjectionToken<ReadonlyArray<NgDocsPages>> =
  new InjectionToken<ReadonlyArray<NgDocsPages>>('Navigation pages');

export const NAVIGATION_PROVIDERS: Provider[] = [
  DestroyService,
  {
    provide: NAVIGATION_TITLE,
    deps: [Router, ActivatedRoute, NG_DOCS_TITLE, DestroyService],
    useFactory: titleProviderFactory,
  },
  {
    provide: NAVIGATION_LABELS,
    deps: [NG_DOCS_PAGES],
    useFactory: labelsProviderFactory,
  },
  {
    provide: NAVIGATION_ITEMS,
    deps: [NG_DOCS_PAGES],
    useFactory: itemsProviderFactory,
  },
];

export function titleProviderFactory(
  router: Router,
  activatedRoute: ActivatedRoute,
  titlePrefix: string,
  destroy$: Observable<void>
): Observable<string> {
  return router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => activatedRoute.firstChild),
    filter(isPresent),
    mergeMap(({ data }) => data),
    map(({ title }) => titlePrefix + title),
    takeUntil(destroy$)
  );
}

export function labelsProviderFactory(pages: NgDocsPages): readonly string[] {
  return pages
    .map(({ section }) => section)
    .filter(isPresent)
    .filter((item, index, array) => array.indexOf(item) === index);
}

export function itemsProviderFactory(
  pages: NgDocsPages
): ReadonlyArray<NgDocsPages> {
  const labels = labelsProviderFactory(pages);

  return [
    ...labels.map((label) => pages.filter(({ section }) => section === label)),
    pages.filter((page) => !page.section),
  ];
}
