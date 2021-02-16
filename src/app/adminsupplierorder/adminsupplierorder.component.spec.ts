import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsupplierorderComponent } from './adminsupplierorder.component';

describe('AdminsupplierorderComponent', () => {
  let component: AdminsupplierorderComponent;
  let fixture: ComponentFixture<AdminsupplierorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsupplierorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsupplierorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
