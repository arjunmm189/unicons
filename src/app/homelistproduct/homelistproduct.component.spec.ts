import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelistproductComponent } from './homelistproduct.component';

describe('HomelistproductComponent', () => {
  let component: HomelistproductComponent;
  let fixture: ComponentFixture<HomelistproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomelistproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelistproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
