import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadymadeorderbasedComponent } from './readymadeorderbased.component';

describe('ReadymadeorderbasedComponent', () => {
  let component: ReadymadeorderbasedComponent;
  let fixture: ComponentFixture<ReadymadeorderbasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadymadeorderbasedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadymadeorderbasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
