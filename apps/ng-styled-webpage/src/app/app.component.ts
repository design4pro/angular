import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Styled } from '@design4pro/ng-styled';
import { GLOBAL_STYLES } from './app.component.styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ injectGlobal }) => {
  injectGlobal(GLOBAL_STYLES);
})
export class AppComponent {}
