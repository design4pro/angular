import { Injectable } from '@angular/core';
import { ThemeBreakpoints, ThemePalette } from '../angular-jss.types';
import { Store } from '../utils/store';

export class ThemeContext {
  breakpoints?: ThemeBreakpoints;
  direction?: string;
  palette?: ThemePalette;
}

@Injectable()
export class ThemeStore extends Store<ThemeContext> {
  private static instance: ThemeStore;

  constructor() {
    super(new ThemeContext());
  }

  static getInstance(): ThemeStore {
    if (!ThemeStore.instance) {
      ThemeStore.instance = new ThemeStore();
    }

    return ThemeStore.instance;
  }
}
