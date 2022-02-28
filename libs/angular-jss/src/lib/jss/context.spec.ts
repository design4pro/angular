import { TestBed } from '@angular/core/testing';
import { JssStore } from './context';

describe('JssStore', () => {
  let store: JssStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JssStore],
    });

    store = new JssStore();
    store.setState({
      disableStylesGeneration: false,
    });
  });

  it('should disable styles generation', () => {
    expect(store.state.disableStylesGeneration).toBe(false);
  });
});
