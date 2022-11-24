import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Styled } from '@design4pro/ng-styled';
import { GITHUB_STYLES } from './code.component.styles';

@Component({
  selector: 'ng-styled-code',
  templateUrl: './code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css }) => {
  return css(
    {
      root: GITHUB_STYLES,
    },
    { name: 'code' }
  );
})
export class CodeComponent {
  classes: any;

  @Input()
  code = '';

  @Input()
  language = 'typescript';
}
