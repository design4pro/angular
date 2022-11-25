import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'layout-footer',
  templateUrl: './layout-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutFooterComponent {
  year = new Date().getFullYear();
}
