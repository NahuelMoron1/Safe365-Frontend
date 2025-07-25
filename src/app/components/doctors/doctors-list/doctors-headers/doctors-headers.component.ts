import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-doctors-headers',
  imports: [NgIf],
  templateUrl: './doctors-headers.component.html',
  styleUrl: './doctors-headers.component.css',
})
export class DoctorsHeadersComponent {
  @Input()
  public user?: User;
}
