import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateButtonComponent } from './rotate-button.component';

describe('RotateButtonComponent', () => {
  let component: RotateButtonComponent;
  let fixture: ComponentFixture<RotateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotateButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
