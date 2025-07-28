import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFullReviewsModalComponent } from './see-full-reviews-modal.component';

describe('SeeFullReviewsModalComponent', () => {
  let component: SeeFullReviewsModalComponent;
  let fixture: ComponentFixture<SeeFullReviewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeFullReviewsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeFullReviewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
