import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieruniformaccsaccsreadymadeComponent } from './supplieruniformaccsaccsreadymade.component';

describe('SupplieruniformaccsaccsreadymadeComponent', () => {
  let component: SupplieruniformaccsaccsreadymadeComponent;
  let fixture: ComponentFixture<SupplieruniformaccsaccsreadymadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieruniformaccsaccsreadymadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieruniformaccsaccsreadymadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
