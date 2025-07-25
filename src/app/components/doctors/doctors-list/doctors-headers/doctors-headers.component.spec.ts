import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsHeadersComponent } from './doctors-headers.component';

describe('DoctorsHeadersComponent', () => {
  let component: DoctorsHeadersComponent;
  let fixture: ComponentFixture<DoctorsHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
