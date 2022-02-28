import { JssOptions } from './jss/types';

export interface Options extends JssOptions {
  normalize?: boolean;
}

export interface Theme {
  breakpoints?: ThemeBreakpoints;
  direction?: string;
  overrides?: object;
  props?: object;
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
