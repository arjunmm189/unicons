import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCHINEADDComponent } from './mchineadd.component';

describe('MCHINEADDComponent', () => {
  let component: MCHINEADDComponent;
  let fixture: ComponentFixture<MCHINEADDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MCHINEADDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MCHINEADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
