import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustuniformaccsComponent } from './custuniformaccs.component';

describe('CustuniformaccsComponent', () => {
  let component: CustuniformaccsComponent;
  let fixture: ComponentFixture<CustuniformaccsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustuniformaccsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustuniformaccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
