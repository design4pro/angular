import deepmerge from '../utils/deepmerge';
import { Breakpoints } from './breakpoints';
import createBreakpoints from './breakpoints/create-breakpoints';
import createPalette from './palette/create-palette';
import { Palette } from './palette/types';
import { SpacingOptions } from './spacing';
import createSpacing from './spacing/create-spacing';
import { Theme } from './types';
import createTypography from './typography/create-typography';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createTheme(options: Partial<Theme> = {}, ...args: any): Theme {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput as Breakpoints);
  const palette = createPalette(paletteInput as Palette);
  const spacing = createSpacing(spacingInput as SpacingOptions);
  const typography = createTypography(palette, typographyInput);

  let theme = deepmerge<Theme>(
    {
      breakpoints: breakpoints,
      direction: 'ltr',
      palette: palette,
      spacing: spacing,
      typography: typography,
    },
    other
  );

  theme = args.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: Theme, argument: any) => deepmerge<Theme>(acc, argument),
    theme
  );

  return theme;
}

export default createTheme;
