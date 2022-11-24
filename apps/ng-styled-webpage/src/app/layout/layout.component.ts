import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Styled } from '@design4pro/ng-styled';
import { COMPONENT_STYLES } from './layout.component.styles';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css }) => css(COMPONENT_STYLES))
export class LayoutComponent {
  classes: { host: string } | undefined;

  @HostBinding('class')
  get className() {
    return this.classes?.host;
  }
}
