import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { NG_DOCS_SEE_ALSO_TEXT } from '../utils/tokens/i18n';
import { NG_DOCS_PAGES } from '../utils/tokens/pages';
import { NgDocsPage, NgDocsPageGroup } from '../utils/types/page';

@Component({
  selector: 'ng-docs-see-also',
  templateUrl: './see-also.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeeAlsoComponent {
  @Input()
  seeAlso: readonly string[] = [];

  constructor(
    @Inject(NG_DOCS_SEE_ALSO_TEXT) readonly text: string,
    @Inject(NG_DOCS_PAGES)
    private readonly pages: ReadonlyArray<NgDocsPageGroup | NgDocsPage>
  ) {}

  getRouterLink(pageTitle: string): string {
    for (let i = 0; i < this.pages.length; i++) {
      const page = this.pages
        .map((page) => ('subPages' in page ? page.subPages : [page]))
        .reduce((pages, subPages) => [...pages, ...subPages], [])
        .find((page: NgDocsPage) => page.title === pageTitle);

      if (page && page.route) {
        return page.route;
      }
    }

    return '';
  }
}
