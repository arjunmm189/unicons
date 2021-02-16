import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierreadymadeComponent } from './supplierreadymade.component';

describe('SupplierreadymadeComponent', () => {
  let component: SupplierreadymadeComponent;
  let fixture: ComponentFixture<SupplierreadymadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierreadymadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierreadymadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
