import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewModalComponent } from './create-review-modal.component';

describe('CreateReviewModalComponent', () => {
  let component: CreateReviewModalComponent;
  let fixture: ComponentFixture<CreateReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
