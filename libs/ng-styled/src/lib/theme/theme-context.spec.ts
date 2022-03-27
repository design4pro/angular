import { TestBed } from '@angular/core/testing';
import { ThemeStore } from './theme-context';

describe('ThemeStore', () => {
  let store: ThemeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeStore],
    });

    store = new ThemeStore();
    store.setState({
      direction: 'rtl',
    });
  });

  it('should direction be RTL', () => {
    expect(store.state.direction).toBe('rtl');
  });
});
