import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminquotationComponent } from './adminquotation.component';

describe('AdminquotationComponent', () => {
  let component: AdminquotationComponent;
  let fixture: ComponentFixture<AdminquotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminquotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminquotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
