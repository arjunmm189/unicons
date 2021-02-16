import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderformeditComponent } from './orderformedit.component';

describe('OrderformeditComponent', () => {
  let component: OrderformeditComponent;
  let fixture: ComponentFixture<OrderformeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderformeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderformeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
