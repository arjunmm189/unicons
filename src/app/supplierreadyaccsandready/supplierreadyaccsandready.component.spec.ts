import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierreadyaccsandreadyComponent } from './supplierreadyaccsandready.component';

describe('SupplierreadyaccsandreadyComponent', () => {
  let component: SupplierreadyaccsandreadyComponent;
  let fixture: ComponentFixture<SupplierreadyaccsandreadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierreadyaccsandreadyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierreadyaccsandreadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
