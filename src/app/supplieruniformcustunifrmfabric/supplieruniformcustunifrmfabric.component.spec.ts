import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieruniformcustunifrmfabricComponent } from './supplieruniformcustunifrmfabric.component';

describe('SupplieruniformcustunifrmfabricComponent', () => {
  let component: SupplieruniformcustunifrmfabricComponent;
  let fixture: ComponentFixture<SupplieruniformcustunifrmfabricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieruniformcustunifrmfabricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieruniformcustunifrmfabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
