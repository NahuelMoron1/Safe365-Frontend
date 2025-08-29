import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsInformationComponent } from './turns-information.component';

describe('TurnsInformationComponent', () => {
  let component: TurnsInformationComponent;
  let fixture: ComponentFixture<TurnsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnsInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
