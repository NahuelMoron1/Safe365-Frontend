import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsReviewsComponent } from './doctors-reviews.component';

describe('DoctorsReviewsComponent', () => {
  let component: DoctorsReviewsComponent;
  let fixture: ComponentFixture<DoctorsReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
