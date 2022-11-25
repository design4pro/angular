import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { JssStore } from './jss/context';
import {
  StyledOptions,
  styledOptionsFactory,
  StyledTheme,
  styledThemeFactory,
  STYLED_OPTIONS_INJECTOR,
  STYLED_THEME_INJECTOR,
} from './styled.options';
import { styledFactory, StyledService } from './styled.service';
import defaultTheme from './theme/default-theme';
import { ThemeStore } from './theme/theme-context';

@NgModule({
  imports: [CommonModule],
  providers: [JssStore, ThemeStore],
})
export class StyledModule {
  static forRoot(
    options?: Partial<StyledOptions>,
    theme?: Partial<StyledTheme>
  ): ModuleWithProviders<StyledModule> {
    const _theme = theme || defaultTheme;

    return {
      ngModule: StyledModule,
      providers: [
        StyledService,
        {
          provide: STYLED_OPTIONS_INJECTOR,
          useValue: options,
        },
        {
          provide: STYLED_THEME_INJECTOR,
          useValue: _theme,
        },
        {
          provide: StyledOptions,
          useFactory: styledOptionsFactory,
          deps: [STYLED_OPTIONS_INJECTOR],
        },
        {
          provide: StyledTheme,
          useFactory: styledThemeFactory,
          deps: [STYLED_THEME_INJECTOR],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: styledFactory,
          deps: [StyledService, StyledOptions, StyledTheme],
          multi: true,
        },
      ],
    };
  }
}
