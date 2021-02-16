import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieruniformaccsComponent } from './supplieruniformaccs.component';

describe('SupplieruniformaccsComponent', () => {
  let component: SupplieruniformaccsComponent;
  let fixture: ComponentFixture<SupplieruniformaccsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieruniformaccsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieruniformaccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
