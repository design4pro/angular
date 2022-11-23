import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import {
  PolymorphicContent,
  PolymorphicContextWithImplicit,
} from '@design4pro/ng-polymorphic';
import { DOCS_SOURCE_CODE_TEXT } from '../utils/tokens/i18n';
import { DOCS_SOURCE_CODE } from '../utils/tokens/source-code';
import { DocsSourceCodePathOptions } from '../utils/types/source-code-path-options';

@Component({
  selector: 'ng-docs-source-code',
  templateUrl: './source-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceCodeComponent<T> {
  @Input()
  header = '';

  @Input()
  package = '';

  @Input()
  type = '';

  @Input()
  path = '';

  constructor(
    @Inject(DOCS_SOURCE_CODE)
    readonly sourceCode: PolymorphicContent<DocsSourceCodePathOptions>,
    @Inject(DOCS_SOURCE_CODE_TEXT) readonly text: string
  ) {}

  get pathOptions(): DocsSourceCodePathOptions {
    return this.getPathOptions(this.header, this.package, this.type, this.path);
  }

  getContext($implicit: T): PolymorphicContextWithImplicit<T> {
    return {
      $implicit,
    };
  }

  private getPathOptions(
    header: string,
    packageName: string,
    type: string,
    path: string
  ): DocsSourceCodePathOptions {
    return {
      header,
      package: packageName,
      type,
      path,
    };
  }
}
