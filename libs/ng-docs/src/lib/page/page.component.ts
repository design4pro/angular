import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Inject,
  Input,
  QueryList,
} from '@angular/core';
import { EMPTY_QUERY } from '../utils/constants/empty';
import { NG_DOCS_DEFAULT_TABS } from '../utils/tokens/default-tabs';
import { NgDocsPageTabDirective } from './page-tab.directive';
import { PAGE_PROVIDERS, PAGE_SEE_ALSO } from './page.providers';

@Component({
  selector: 'ng-docs-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: PAGE_PROVIDERS,
})
export class NgDocsPageComponent {
  @Input()
  header = '';

  @Input()
  package = '';

  @Input()
  type = '';

  @Input()
  path = '';

  @ContentChildren(NgDocsPageTabDirective)
  readonly tabConnectors: QueryList<NgDocsPageTabDirective> = EMPTY_QUERY;

  activeItemIndex = NaN;

  constructor(
    @Attribute('deprecated') readonly deprecated: string | null,
    @Inject(NG_DOCS_DEFAULT_TABS) readonly defaultTabs: readonly string[],
    @Inject(PAGE_SEE_ALSO) readonly seeAlso: readonly string[]
  ) {}

  get showSeeAlso(): boolean {
    return !!this.seeAlso.length && this.activeItemIndex === 0;
  }

  getRouterLink(tab: string = ''): string {
    return `./${tab.replace(/ /g, '_')}`;
  }
}
