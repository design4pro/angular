import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Styled } from '@design4pro/ng-styled';
import { COMPONENT_STYLES } from './layout-header.component.styles';

@Component({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css }) => css(COMPONENT_STYLES, { name: 'layout-header' }))
export class LayoutHeaderComponent {
  classes: any;

  @HostBinding('class')
  get className() {
    return this.classes.host;
  }
}
