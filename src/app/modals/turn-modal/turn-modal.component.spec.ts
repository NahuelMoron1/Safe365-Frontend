import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnModalComponent } from './turn-modal.component';

describe('TurnModalComponent', () => {
  let component: TurnModalComponent;
  let fixture: ComponentFixture<TurnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
