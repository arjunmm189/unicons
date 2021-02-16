import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotatioComponent } from './quotatio.component';

describe('QuotatioComponent', () => {
  let component: QuotatioComponent;
  let fixture: ComponentFixture<QuotatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
