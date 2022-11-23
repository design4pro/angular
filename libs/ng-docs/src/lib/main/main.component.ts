import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ng-docs-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocsMainComponent {}
