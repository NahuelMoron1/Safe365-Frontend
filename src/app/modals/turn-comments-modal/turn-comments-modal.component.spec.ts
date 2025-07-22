import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnCommentsModalComponent } from './turn-comments-modal.component';

describe('TurnCommentsModalComponent', () => {
  let component: TurnCommentsModalComponent;
  let fixture: ComponentFixture<TurnCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnCommentsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
