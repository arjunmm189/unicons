import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourformComponent } from './labourform.component';

describe('LabourformComponent', () => {
  let component: LabourformComponent;
  let fixture: ComponentFixture<LabourformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
