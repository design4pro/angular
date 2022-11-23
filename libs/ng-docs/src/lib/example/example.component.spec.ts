import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocsExampleComponent } from './example.component';

describe('NgDocsExampleComponent', () => {
  let component: NgDocsExampleComponent;
  let fixture: ComponentFixture<NgDocsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgDocsExampleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDocsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
