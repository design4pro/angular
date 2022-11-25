import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import defaultTheme from './default-theme';
import { Theme } from './types';

export type ThemeContext = Partial<Theme>;

@Injectable()
export class ThemeStore extends Store<ThemeContext> {
  private static instance: ThemeStore;

  constructor() {
    super(defaultTheme);
  }

  static getInstance(): ThemeStore {
    if (!ThemeStore.instance) {
      ThemeStore.instance = new ThemeStore();
    }

    return ThemeStore.instance;
  }
}
