import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustcustomfabricstitchComponent } from './custcustomfabricstitch.component';

describe('CustcustomfabricstitchComponent', () => {
  let component: CustcustomfabricstitchComponent;
  let fixture: ComponentFixture<CustcustomfabricstitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustcustomfabricstitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustcustomfabricstitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
