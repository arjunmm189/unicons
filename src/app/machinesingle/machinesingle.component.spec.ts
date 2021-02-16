import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesingleComponent } from './machinesingle.component';

describe('MachinesingleComponent', () => {
  let component: MachinesingleComponent;
  let fixture: ComponentFixture<MachinesingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinesingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
