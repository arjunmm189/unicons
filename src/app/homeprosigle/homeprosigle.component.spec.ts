import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeprosigleComponent } from './homeprosigle.component';

describe('HomeprosigleComponent', () => {
  let component: HomeprosigleComponent;
  let fixture: ComponentFixture<HomeprosigleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeprosigleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeprosigleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
