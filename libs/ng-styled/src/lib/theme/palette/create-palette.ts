import deepmerge from '../../utils/deepmerge';
import common from './common';
import { Palette } from './types';

export function createPalette(palette: Palette): Palette {
  const { mode = 'light', ...other } = palette;

  const paletteOutput = deepmerge<Palette>(
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
