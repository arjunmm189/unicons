import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredquotesComponent } from './expiredquotes.component';

describe('ExpiredquotesComponent', () => {
  let component: ExpiredquotesComponent;
  let fixture: ComponentFixture<ExpiredquotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredquotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
