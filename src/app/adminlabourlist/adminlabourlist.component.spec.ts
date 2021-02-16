import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlabourlistComponent } from './adminlabourlist.component';

describe('AdminlabourlistComponent', () => {
  let component: AdminlabourlistComponent;
  let fixture: ComponentFixture<AdminlabourlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminlabourlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminlabourlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
