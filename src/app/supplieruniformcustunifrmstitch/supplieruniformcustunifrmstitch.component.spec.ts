import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieruniformcustunifrmstitchComponent } from './supplieruniformcustunifrmstitch.component';

describe('SupplieruniformcustunifrmstitchComponent', () => {
  let component: SupplieruniformcustunifrmstitchComponent;
  let fixture: ComponentFixture<SupplieruniformcustunifrmstitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieruniformcustunifrmstitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieruniformcustunifrmstitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
