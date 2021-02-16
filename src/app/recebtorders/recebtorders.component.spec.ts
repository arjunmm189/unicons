import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebtordersComponent } from './recebtorders.component';

describe('RecebtordersComponent', () => {
  let component: RecebtordersComponent;
  let fixture: ComponentFixture<RecebtordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecebtordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecebtordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
