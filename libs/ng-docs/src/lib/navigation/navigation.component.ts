import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { uniqBy } from '../utils/miscellaneous/uniq-by';
import { NG_DOCS_SEARCH_TEXT } from '../utils/tokens/i18n';
import { NgDocsPage, NgDocsPages } from '../utils/types/page';
import {
  NAVIGATION_ITEMS,
  NAVIGATION_LABELS,
  NAVIGATION_PROVIDERS,
  NAVIGATION_TITLE,
} from './navigation.providers';

const SCROLL_INTO_VIEW_DELAY = 200;

@Component({
  selector: 'ng-docs-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: NAVIGATION_PROVIDERS,
})
export class NavigationComponent {
  @HostBinding('class._open')
  menuOpen = false;

  search = '';
  open = false;
  openPagesArr: boolean[] = [];
  openPagesGroupsArr: boolean[] = [];
  active = '';

  constructor(
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
    @Inject(Title) titleService: Title,
    @Inject(NAVIGATION_TITLE) title$: Observable<string>,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(NAVIGATION_LABELS) readonly labels: string[],
    @Inject(NAVIGATION_ITEMS)
    readonly items: ReadonlyArray<NgDocsPages>,
    @Inject(NG_DOCS_SEARCH_TEXT) readonly searchText: string,
    @Inject(Router) private readonly router: Router,
    @Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute
  ) {
    // Angular can't navigate no anchor links
    // https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
    title$.subscribe((title) => {
      changeDetectorRef.markForCheck();
      titleService.setTitle(title);
      this.openActivePageGroup();
      this.handleAnchorLink(this.activatedRoute.snapshot.fragment as string);
    });
  }

  get canOpen(): boolean {
    return this.search.length > 2;
  }

  get filteredItems(): ReadonlyArray<ReadonlyArray<NgDocsPage>> {
    return this.filterItems(this.flattenSubPages(this.items), this.search);
  }

  get itemsWithoutSections() {
    return this.items[this.items.length - 1];
  }

  isActive(route: string): boolean {
    return route === this.active;
  }

  onGroupClick(index: number) {
    this.openPagesGroupsArr[index] = !this.openPagesGroupsArr[index];
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onSearchChange(search: string) {
    this.search = search;
    this.open = this.canOpen;
  }

  onClick() {
    this.open = false;
    this.menuOpen = false;
    this.search = '';
    this.openActivePageGroup();
  }

  private filterItems(
    items: ReadonlyArray<ReadonlyArray<NgDocsPage>>,
    search: string
  ): ReadonlyArray<ReadonlyArray<NgDocsPage>> {
    return items.map((section) =>
      uniqBy(
        section.filter(({ title, keywords = '' }) => {
          title = title.toLowerCase();
          search = search.toLowerCase();
          keywords = keywords.toLowerCase();

          return (
            title.includes(search) ||
            keywords.includes(search) ||
            title.includes(search) ||
            keywords.includes(search) ||
            search.replace(/-/gi, '').includes(title)
          );
        }),
        'title'
      )
    );
  }

  private flattenSubPages(
    items: ReadonlyArray<NgDocsPages>
  ): ReadonlyArray<ReadonlyArray<NgDocsPage>> {
    return items.reduce<ReadonlyArray<ReadonlyArray<NgDocsPage>>>(
      (array, item) => [
        ...array,
        item.reduce<ReadonlyArray<NgDocsPage>>(
          (pages, page) =>
            'subPages' in page
              ? [...pages, ...page.subPages]
              : [...pages, page],
          []
        ),
      ],
      []
    );
  }

  private isActiveRoute(route: string): boolean {
    return this.router.isActive(route, false);
  }

  private handleAnchorLink(hash: string) {
    setTimeout(() => {
      this.navigateToAnchorLink(hash);
    }, SCROLL_INTO_VIEW_DELAY);
  }

  private openActivePageGroup() {
    this.items.forEach((pages, pagesIndex) => {
      pages.forEach((page, pageIndex) => {
        if ('route' in page && this.isActiveRoute(page.route)) {
          this.openPagesArr[pagesIndex] = true;
          this.active = page.route;
        }

        if ('subPages' in page) {
          page.subPages.forEach((subPage) => {
            if (this.isActiveRoute(subPage.route)) {
              this.openPagesArr[pagesIndex] = true;
              this.openPagesGroupsArr[pagesIndex * 100 + pageIndex] = true;
              this.active = subPage.route;
            }
          });
        }
      });
    });
  }

  private navigateToAnchorLink(fragment: string) {
    const element = fragment && this.documentRef.querySelector(`#${fragment}`);

    if (!element) {
      return;
    }

    element.classList.add('tui-doc-animated-example');
    element.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }
}
