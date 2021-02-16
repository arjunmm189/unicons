import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieruniformcustunifrmfabricandstitchComponent } from './supplieruniformcustunifrmfabricandstitch.component';

describe('SupplieruniformcustunifrmfabricandstitchComponent', () => {
  let component: SupplieruniformcustunifrmfabricandstitchComponent;
  let fixture: ComponentFixture<SupplieruniformcustunifrmfabricandstitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieruniformcustunifrmfabricandstitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieruniformcustunifrmfabricandstitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
