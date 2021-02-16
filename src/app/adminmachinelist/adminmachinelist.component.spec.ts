import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmachinelistComponent } from './adminmachinelist.component';

describe('AdminmachinelistComponent', () => {
  let component: AdminmachinelistComponent;
  let fixture: ComponentFixture<AdminmachinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmachinelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmachinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
