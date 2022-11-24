import { ThemeType } from '../types';
import ColorCommon from './common';

export interface Palette {
  mode: ThemeType;
  common: typeof ColorCommon;
}
