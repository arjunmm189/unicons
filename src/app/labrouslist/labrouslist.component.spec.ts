import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabrouslistComponent } from './labrouslist.component';

describe('LabrouslistComponent', () => {
  let component: LabrouslistComponent;
  let fixture: ComponentFixture<LabrouslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabrouslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabrouslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
