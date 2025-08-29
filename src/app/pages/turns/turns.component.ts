import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TurnsInformationComponent } from '../../shared/components/turns-information/turns-information.component';
import { User } from '../../shared/models/User';

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
