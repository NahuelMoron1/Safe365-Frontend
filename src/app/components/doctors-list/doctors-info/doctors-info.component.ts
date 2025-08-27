import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-doctors-info',
  imports: [NgIf, NgFor],
  templateUrl: './doctors-info.component.html',
  styleUrl: './doctors-info.component.css',
})
export class DoctorsInfoComponent {
  @Input()
  public user?: User;

  @Input()
  public attendant?: User;
}
