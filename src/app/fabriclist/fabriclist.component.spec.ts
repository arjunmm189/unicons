import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabriclistComponent } from './fabriclist.component';

describe('FabriclistComponent', () => {
  let component: FabriclistComponent;
  let fixture: ComponentFixture<FabriclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabriclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabriclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
