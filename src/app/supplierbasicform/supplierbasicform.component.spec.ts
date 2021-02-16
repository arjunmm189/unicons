import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierbasicformComponent } from './supplierbasicform.component';

describe('SupplierbasicformComponent', () => {
  let component: SupplierbasicformComponent;
  let fixture: ComponentFixture<SupplierbasicformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierbasicformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierbasicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
