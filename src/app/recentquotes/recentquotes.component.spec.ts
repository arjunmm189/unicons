import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentquotesComponent } from './recentquotes.component';

describe('RecentquotesComponent', () => {
  let component: RecentquotesComponent;
  let fixture: ComponentFixture<RecentquotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentquotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentquotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
