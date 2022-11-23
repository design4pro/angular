import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocsDemoComponent } from './demo.component';

describe('NgDocsDemoComponent', () => {
  let component: NgDocsDemoComponent;
  let fixture: ComponentFixture<NgDocsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgDocsDemoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDocsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
