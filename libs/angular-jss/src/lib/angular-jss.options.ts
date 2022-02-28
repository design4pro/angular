import { InjectionToken } from '@angular/core';
import { SheetsRegistry } from 'jss';
import { Options, Theme } from './angular-jss.types';

export const ANGULAR_JSS_OPTIONS_INJECTOR = new InjectionToken<Options>(
  'ANGULAR_JSS_OPTIONS_INJECTOR'
);

export const ANGULAR_JSS_THEME_INJECTOR = new InjectionToken<Theme>(
  'ANGULAR_JSS_THEME_INJECTOR'
);

/**
 * Configuration for NG JSS service.
 */
export class AngularJssOptions implements Options {
  normalize = true;

  registry = new SheetsRegistry();

  id = undefined;

  classNamePrefix = undefined;

  media = undefined;

  jss = undefined;

  disableStylesGeneration = false;
}

/**
 * NG JSS options provider
 */
export function angularJssOptionsFactory(options?: Options): AngularJssOptions {
  const moduleOptions = new AngularJssOptions();

  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the NgJssOptions Type provider.
  if (options) {
    if (typeof options.normalize === 'boolean') {
      moduleOptions.normalize = options.normalize;
    }

    if (options.registry instanceof SheetsRegistry) {
      moduleOptions.registry = options.registry;
    }
  }

  return moduleOptions;
}

export class AngularJssTheme implements Theme {
  
}

/**
 * JSS theme provider
 */
export function angularJssThemeFactory(theme?: Theme): AngularJssTheme {
  const moduleTheme = { ...new AngularJssTheme(), ...theme } as AngularJssTheme;

  return moduleTheme;
}
