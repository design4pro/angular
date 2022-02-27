import { Injectable } from '@angular/core';
import { ThemeBreakpoints } from '../angular-jss.types';
import { Store } from '../utils/store';

export type ThemeType = string | 'auto' | 'light' | 'dark';

export class ThemeContext {
  breakpoints?: ThemeBreakpoints;
  direction?: string;
  overrides?: object;
  props?: object;
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
