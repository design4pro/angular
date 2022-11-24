import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Styled, StyledProp } from '@design4pro/ng-styled';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css, injectGlobal }) => {
  injectGlobal({
    ':root': {
      '--background-color': (data: { color: string }) => data.color,
    },
  });

  return css(
    (theme) => ({
      root: {
        textAlign: 'center',
      },
      title: {
        color: theme.palette?.common.white,
        backgroundColor: 'var(--background-color)',
        padding: '20px',
        direction: theme.direction,
      },
      hint: {
        color: theme.palette?.common.black,
      },
    }),
    { name: 'app' }
  );
})
export class HomeComponent {
  title = 'Angular JSS';
  classes: any;

  code = `
    import { ChangeDetectionStrategy, Component } from '@angular/core';
  `;

  @StyledProp()
  color = 'red';

  onMouseEvent() {
    this.color = this.color === 'red' ? 'green' : 'red';
  }
}
