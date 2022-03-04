import { Component } from '@angular/core';
import { Styled, StyledProp, Theme } from '@design4pro/angular-jss';

@Component({
  selector: 'angular-jss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
        color: '#fff',
        backgroundColor: 'var(--background-color)',
        padding: '20px',
        direction: theme.direction,
      },
    }),
    { name: 'first' }
  );
})
export class AppComponent {
  title = 'angular-jss';
  classes: any;
  name?: string;

  @StyledProp()
  color = 'red';

  click() {
    this.color = this.color === 'red' ? 'green' : 'red';
    this.name = this.color;
  }
}
