import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import { Theme } from './types';

export class ThemeContext implements Partial<Theme> {}

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
