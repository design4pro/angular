import { async, TestBed } from '@angular/core/testing';
import { AngularJssModule } from './angular-jss.module';

describe('AngularJssModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularJssModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AngularJssModule).toBeDefined();
  });
});
