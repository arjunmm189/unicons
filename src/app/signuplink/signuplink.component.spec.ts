import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuplinkComponent } from './signuplink.component';

describe('SignuplinkComponent', () => {
  let component: SignuplinkComponent;
  let fixture: ComponentFixture<SignuplinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignuplinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuplinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
