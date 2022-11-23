import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Styled } from '@design4pro/ng-styled';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { rawLoad } from '../utils/raw-load';
import { RawLoaderContent } from '../utils/types/page';
import styles from './code.component.styles';
import { tryParseMarkdownCodeBlock } from './utils/parse-code-block';

@Component({
  selector: 'ng-docs-code',
  templateUrl: './code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css }) => {
  return css(
    {
      root: styles,
    },
    { name: 'code' }
  );
})
export class NgDocsCodeComponent {
  private readonly rawLoader$$ = new BehaviorSubject<RawLoaderContent>('');

  @Input()
  filename = '';

  readonly processor$ = this.rawLoader$$.pipe(
    switchMap(rawLoad),
    map(tryParseMarkdownCodeBlock)
  );

  @Input()
  set code(code: RawLoaderContent) {
    this.rawLoader$$.next(code);
  }

  @HostBinding('class._has-filename')
  get hasFilename(): boolean {
    return !!this.filename;
  }
}
