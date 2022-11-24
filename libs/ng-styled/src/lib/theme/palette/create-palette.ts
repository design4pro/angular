import deepmerge from 'ts-deepmerge';
import common from './common';
import { Palette } from './types';

export function createPalette(palette: Palette): Palette {
  const { mode = 'light', ...other } = palette;

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common: common,
      // The palette mode, can be light or dark.
      mode,
    },
    other
  ) as Palette;

  return paletteOutput;
}

export default createPalette;
