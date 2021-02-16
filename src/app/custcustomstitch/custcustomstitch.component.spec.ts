import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustcustomstitchComponent } from './custcustomstitch.component';

describe('CustcustomstitchComponent', () => {
  let component: CustcustomstitchComponent;
  let fixture: ComponentFixture<CustcustomstitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustcustomstitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustcustomstitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
