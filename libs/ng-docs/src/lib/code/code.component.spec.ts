import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocsCodeComponent } from './code.component';

describe('NgDocsCodeComponent', () => {
  let component: NgDocsCodeComponent;
  let fixture: ComponentFixture<NgDocsCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgDocsCodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDocsCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
