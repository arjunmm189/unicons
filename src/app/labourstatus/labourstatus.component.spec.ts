import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourstatusComponent } from './labourstatus.component';

describe('LabourstatusComponent', () => {
  let component: LabourstatusComponent;
  let fixture: ComponentFixture<LabourstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
