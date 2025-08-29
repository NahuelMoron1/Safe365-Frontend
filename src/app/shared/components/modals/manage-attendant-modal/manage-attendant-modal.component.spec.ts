import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendantModalComponent } from './manage-attendant-modal.component';

describe('ManageAttendantModalComponent', () => {
  let component: ManageAttendantModalComponent;
  let fixture: ComponentFixture<ManageAttendantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAttendantModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAttendantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
