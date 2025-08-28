import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialworkComponent } from './add-socialwork.component';

describe('AddSocialworkComponent', () => {
  let component: AddSocialworkComponent;
  let fixture: ComponentFixture<AddSocialworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSocialworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
