import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTurnModalComponent } from './cancel-turn-modal.component';

describe('CancelTurnModalComponent', () => {
  let component: CancelTurnModalComponent;
  let fixture: ComponentFixture<CancelTurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelTurnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTurnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
