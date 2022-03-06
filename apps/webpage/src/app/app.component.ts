import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Styled, StyledProp, Theme } from '@design4pro/angular-jss';

@Component({
  selector: 'angular-jss-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Styled(({ css, injectGlobal }) => {
  injectGlobal({
    '@global': {
      ':root': {
        '--background-color': (data: { color: string }) => data.color,
      },
    },
  });

  return css(
    (theme: Theme) => ({
      root: {
        textAlign: 'center',
      },
      title: {
        color: theme.palette?.common?.white,
        backgroundColor: 'var(--background-color)',
        padding: '20px',
        direction: theme.direction,
      },
      hint: {
        color: theme.palette?.common?.black,
      },
    }),
    { name: 'first' }
  );
})
export class AppComponent {
  title = 'Angular JSS';
  classes: any;

  @StyledProp()
  color = 'red';

  onMouseEvent() {
    this.color = this.color === 'red' ? 'green' : 'red';
  }
}
