import { JssOptions } from './jss/types';
import { ColorCommon } from './theme/colors/common';

export interface Options extends JssOptions {
  normalize?: boolean;
}

export interface Theme {
  breakpoints?: ThemeBreakpoints;
  direction?: string;
  palette?: ThemePalette;
}

export interface ThemeBreakpoints {
  keys: string[];
  values: {
    [key: string]: number;
  };
  up: (key: string) => string;
  down: (key: string) => string;
  between: (key: string) => string;
  only: (key: string) => string;
  width: (key: string) => string;
  unit?: string;
  step?: number;
}

export type ThemeType = string | 'auto' | 'light' | 'dark';

export interface ThemePaletteCommonColor {
  [key: string]: ColorCommon;
}

export interface ThemePalette {
  mode: ThemeType;
  common: typeof ColorCommon;
}
