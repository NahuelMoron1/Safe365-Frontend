import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTurnModalComponent } from './complete-turn-modal.component';

describe('CompleteTurnModalComponent', () => {
  let component: CompleteTurnModalComponent;
  let fixture: ComponentFixture<CompleteTurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTurnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTurnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
