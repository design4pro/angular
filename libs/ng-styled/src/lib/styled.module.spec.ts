import { async, TestBed } from '@angular/core/testing';
import { StyledModule } from './styled.module';

describe('StyledModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StyledModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(StyledModule).toBeDefined();
  });
});
