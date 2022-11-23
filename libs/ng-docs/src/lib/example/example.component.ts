import { Clipboard } from '@angular/cdk/clipboard';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
} from '@angular/core';
import { NgPolymorphicContent } from '@design4pro/ng-polymorphic';
import { LOCATION } from '@ng-web-apis/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { rawLoadRecord } from '../utils/raw-load-record';
import { NG_DOCS_CODE_EDITOR } from '../utils/tokens/code-editor';
import { NG_DOCS_EXAMPLE_CONTENT_PROCESSOR } from '../utils/tokens/example-content-processor';
import {
  NG_DOCS_COPY_TEXTS,
  NG_DOCS_EXAMPLE_TEXTS,
} from '../utils/tokens/i18n';
import { CodeEditor } from '../utils/types/code-editor';
import { NgDocsHandler } from '../utils/types/handler';
import { NgDocsExample } from '../utils/types/page';

@Component({
  selector: 'ng-docs-example',
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocsExampleComponent {
  private readonly rawLoader$$ = new BehaviorSubject<NgDocsExample>({});

  @Input()
  heading: NgPolymorphicContent = '';

  @Input()
  description: NgPolymorphicContent = '';

  @Input()
  set content(content: NgDocsExample) {
    this.rawLoader$$.next(content);
  }

  @Input()
  componentName: string = this.location.pathname.slice(1);

  readonly defaultTabIndex = 0;

  readonly defaultTab = this.texts[this.defaultTabIndex];

  activeItemIndex = this.defaultTabIndex;

  readonly copy$ = this.copyTexts$.pipe(map(([copy]) => copy));

  readonly processor$: Observable<Record<string, string>> =
    this.rawLoader$$.pipe(switchMap(rawLoadRecord), map(this.processContent));

  constructor(
    @Attribute('id')
    readonly id: string | null,
    @Inject(Clipboard) private readonly clipboard: Clipboard,
    @Inject(LOCATION) private readonly location: Location,
    @Inject(NG_DOCS_COPY_TEXTS)
    private readonly copyTexts$: Observable<[string, string]>,
    @Inject(NG_DOCS_EXAMPLE_TEXTS) readonly texts: [string, string, string],
    @Optional()
    @Inject(NG_DOCS_CODE_EDITOR)
    readonly codeEditor: CodeEditor | null,
    @Inject(NG_DOCS_EXAMPLE_CONTENT_PROCESSOR)
    private readonly processContent: NgDocsHandler<
      Record<string, string>,
      Record<string, string>
    >
  ) {}

  copyExampleLink() {
    const hashPosition = this.location.href.indexOf('#');
    const currentUrl =
      hashPosition > -1
        ? this.location.href.substr(0, hashPosition)
        : this.location.href;
    const url = `${currentUrl}#${this.id}`;

    this.clipboard.copy(url);
  }
}
