import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotComponent } from './quot.component';

describe('QuotComponent', () => {
  let component: QuotComponent;
  let fixture: ComponentFixture<QuotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
