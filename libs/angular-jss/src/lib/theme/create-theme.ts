import { Theme, ThemeBreakpoints, ThemePalette } from '../angular-jss.types';
import deepmerge from '../utils/deepmerge';
import createBreakpoints from './create-breakpoints';
import createPalette from './create-palette';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTheme(options: Theme = {}, ...args: any): Theme {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput as ThemeBreakpoints);
  const palette = createPalette(paletteInput as ThemePalette);

  let theme = deepmerge<Theme>(
    {
      breakpoints: breakpoints,
      direction: 'ltr',
      palette: palette,
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
