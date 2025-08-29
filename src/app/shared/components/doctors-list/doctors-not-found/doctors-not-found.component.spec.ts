import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsNotFoundComponent } from './doctors-not-found.component';

describe('DoctorsNotFoundComponent', () => {
  let component: DoctorsNotFoundComponent;
  let fixture: ComponentFixture<DoctorsNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
