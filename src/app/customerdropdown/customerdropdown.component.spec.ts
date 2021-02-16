import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdropdownComponent } from './customerdropdown.component';

describe('CustomerdropdownComponent', () => {
  let component: CustomerdropdownComponent;
  let fixture: ComponentFixture<CustomerdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
