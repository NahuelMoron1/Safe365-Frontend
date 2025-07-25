import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-doctors-not-found',
  imports: [NgIf],
  templateUrl: './doctors-not-found.component.html',
  styleUrl: './doctors-not-found.component.css',
})
export class DoctorsNotFoundComponent {
  @Input()
  public user?: User;
}
