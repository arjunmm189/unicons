import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierdropdownComponent } from './supplierdropdown.component';

describe('SupplierdropdownComponent', () => {
  let component: SupplierdropdownComponent;
  let fixture: ComponentFixture<SupplierdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
