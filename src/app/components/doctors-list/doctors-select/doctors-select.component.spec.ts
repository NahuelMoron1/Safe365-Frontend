import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSelectComponent } from './doctors-select.component';

describe('DoctorsSelectComponent', () => {
  let component: DoctorsSelectComponent;
  let fixture: ComponentFixture<DoctorsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
