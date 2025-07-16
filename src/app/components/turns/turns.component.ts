import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TurnsInformationComponent } from './turns-information/turns-information.component';
import { User } from '../../models/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-turns',
  imports: [NavBarComponent, TurnsInformationComponent, NgIf],
  templateUrl: './turns.component.html',
  styleUrl: './turns.component.css',
})
export class TurnsComponent {
  @Input()
  public user?: User;

  handleUser(user: any) {
    this.user = user;
  }
}
