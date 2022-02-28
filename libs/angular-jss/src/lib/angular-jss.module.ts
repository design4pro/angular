import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AngularJss, angularJssFactory } from './angular-jss.service';
import { JssStore } from './jss/context';
import {
  AngularJssOptions,
  angularJssOptionsFactory,
  AngularJssTheme,
  angularJssThemeFactory,
  ANGULAR_JSS_OPTIONS_INJECTOR,
  ANGULAR_JSS_THEME_INJECTOR,
} from './angular-jss.options';
import defaultTheme from './theme/default-theme';
import { ThemeStore } from './theme/theme-context';
import { Options, Theme } from './angular-jss.types';

@NgModule({
  imports: [CommonModule],
  providers: [JssStore, ThemeStore],
})
export class AngularJssModule {
  static forRoot(
    options?: Options,
    theme?: Theme
  ): ModuleWithProviders<AngularJssModule> {
    const _theme = theme || defaultTheme;

    return {
      ngModule: AngularJssModule,
      providers: [
        AngularJss,
        {
          provide: ANGULAR_JSS_OPTIONS_INJECTOR,
          useValue: options,
        },
        {
          provide: ANGULAR_JSS_THEME_INJECTOR,
          useValue: _theme,
        },
        {
          provide: AngularJssOptions,
          useFactory: angularJssOptionsFactory,
          deps: [ANGULAR_JSS_OPTIONS_INJECTOR],
        },
        {
          provide: AngularJssTheme,
          useFactory: angularJssThemeFactory,
          deps: [ANGULAR_JSS_THEME_INJECTOR],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: angularJssFactory,
          deps: [AngularJss, AngularJssOptions, AngularJssTheme],
          multi: true,
        },
      ],
    };
  }
}
