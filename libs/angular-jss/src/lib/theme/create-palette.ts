import { ThemePalette } from '../angular-jss.types';
import deepmerge from '../utils/deepmerge';
import common from './colors/common';

function createPalette(palette: ThemePalette): ThemePalette {
  const { mode = 'light', ...other } = palette;

  const paletteOutput = deepmerge<ThemePalette>(
    {
      // A collection of common colors.
      common: common,
      // The palette mode, can be light or dark.
      mode,
    },
    other
  );

  return paletteOutput;
}

export default createPalette;
