import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineandreadtlistComponent } from './machineandreadtlist.component';

describe('MachineandreadtlistComponent', () => {
  let component: MachineandreadtlistComponent;
  let fixture: ComponentFixture<MachineandreadtlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineandreadtlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineandreadtlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
