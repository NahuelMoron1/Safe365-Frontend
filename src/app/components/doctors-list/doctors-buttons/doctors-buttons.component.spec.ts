import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsButtonsComponent } from './doctors-buttons.component';

describe('DoctorsButtonsComponent', () => {
  let component: DoctorsButtonsComponent;
  let fixture: ComponentFixture<DoctorsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
