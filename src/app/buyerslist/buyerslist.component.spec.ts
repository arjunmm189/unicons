import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerslistComponent } from './buyerslist.component';

describe('BuyerslistComponent', () => {
  let component: BuyerslistComponent;
  let fixture: ComponentFixture<BuyerslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
