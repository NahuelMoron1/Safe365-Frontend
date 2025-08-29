import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsInfoComponent } from './reviews-info.component';

describe('ReviewsInfoComponent', () => {
  let component: ReviewsInfoComponent;
  let fixture: ComponentFixture<ReviewsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
