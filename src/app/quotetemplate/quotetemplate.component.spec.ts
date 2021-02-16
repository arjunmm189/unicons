import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotetemplateComponent } from './quotetemplate.component';

describe('QuotetemplateComponent', () => {
  let component: QuotetemplateComponent;
  let fixture: ComponentFixture<QuotetemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotetemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
