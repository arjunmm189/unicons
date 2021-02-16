import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmoreusersComponent } from './viewmoreusers.component';

describe('ViewmoreusersComponent', () => {
  let component: ViewmoreusersComponent;
  let fixture: ComponentFixture<ViewmoreusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmoreusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmoreusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
