import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineaddComponent } from './machineadd.component';

describe('MachineaddComponent', () => {
  let component: MachineaddComponent;
  let fixture: ComponentFixture<MachineaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
