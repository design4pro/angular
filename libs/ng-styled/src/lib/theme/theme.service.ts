import { Injectable } from '@angular/core';
import { ThemeContext, ThemeStore } from './theme-context';

@Injectable()
export class ThemeService {
  constructor(private store: ThemeStore) {}

  context(theme: ThemeContext) {
    this.store.setState(theme);

    return this.store;
  }
}
