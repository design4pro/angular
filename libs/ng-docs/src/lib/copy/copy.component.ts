import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { mapTo, startWith, switchMapTo } from 'rxjs/operators';
import { NG_DOCS_COPY_TEXTS } from '../utils/tokens/i18n';

const COPIED_TIMEOUT = 1500;

@Component({
  selector: 'ng-docs-copy',
  templateUrl: './copy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocsCopyComponent {
  private readonly copy$ = new Subject<void>();

  constructor(
    @Inject(NG_DOCS_COPY_TEXTS) readonly texts$: Observable<[string, string]>
  ) {}

  get copied$(): Observable<boolean> {
    return this.copy$.pipe(
      switchMapTo(timer(COPIED_TIMEOUT).pipe(mapTo(false), startWith(true)))
    );
  }

  onClick() {
    this.copy$.next();
  }
}
