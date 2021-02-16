import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaccsComponent } from './adminaccs.component';

describe('AdminaccsComponent', () => {
  let component: AdminaccsComponent;
  let fixture: ComponentFixture<AdminaccsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaccsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
