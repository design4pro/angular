import { Breakpoints } from './breakpoints';
import { Palette } from './palette/types';
import { Spacing } from './spacing/types';
import { Typography } from './typography/types';

export type ThemeType = string | 'auto' | 'light' | 'dark';

export interface Theme {
  breakpoints: Breakpoints;
  direction: string;
  palette: Palette;
  spacing: Spacing;
  typography: Typography;
}
