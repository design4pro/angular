import { InjectionToken } from '@angular/core';
import { CreateGenerateIdOptions, Jss, SheetsRegistry } from 'jss';
import { Options } from './styled.types';
import { Theme } from './theme';

export const STYLED_OPTIONS_INJECTOR = new InjectionToken<StyledOptions>(
  'STYLED_OPTIONS_INJECTOR'
);

export const STYLED_THEME_INJECTOR = new InjectionToken<Theme>(
  'STYLED_THEME_INJECTOR'
);

/**
 * Configuration for Ng Styled service.
 */
export class StyledOptions implements Options {
  normalize = true;

  registry = new SheetsRegistry();

  id: CreateGenerateIdOptions | undefined = undefined;

  classNamePrefix: string | undefined = undefined;

  media: string | undefined = undefined;

  jss: Jss | undefined = undefined;

  disableStylesGeneration = false;
}

/**
 * Ng Styled options provider
 */
export function styledOptionsFactory(options?: StyledOptions): StyledOptions {
  const moduleOptions = new StyledOptions();

  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the StyledOptions Type provider.
  if (options) {
    if (typeof options.normalize === 'boolean') {
      moduleOptions.normalize = options.normalize;
    }

    if (options.registry instanceof SheetsRegistry) {
      moduleOptions.registry = options.registry;
    }

    if (options.id) {
      moduleOptions.id = options.id;
    }

    if (options.classNamePrefix) {
      moduleOptions.classNamePrefix = options.classNamePrefix;
    }

    if (options.media) {
      moduleOptions.media = options.media;
    }

    if (options.jss) {
      moduleOptions.jss = options.jss;
    }

    if (options.disableStylesGeneration) {
      moduleOptions.disableStylesGeneration = options.disableStylesGeneration;
    }
  }

  return moduleOptions;
}

export class StyledTheme implements Partial<Theme> {}

/**
 * Ng Styled theme provider
 */
export function styledThemeFactory(theme?: Partial<Theme>): StyledTheme {
  const moduleTheme = { ...new StyledTheme(), ...theme } as StyledTheme;

  return moduleTheme;
}
