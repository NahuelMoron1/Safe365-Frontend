import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { User } from '../../models/User';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-account',
  imports: [NavBarComponent, SettingsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  @Input()
  public user?: User;

  handleUser(user: any) {
    this.user = user;
  }
}
