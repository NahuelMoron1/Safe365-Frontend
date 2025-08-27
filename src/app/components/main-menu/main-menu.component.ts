import { Component, Input } from '@angular/core';
import { SkyDropdownModule } from '@skyux/popovers';
import { User } from '../../models/User';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [NavBarComponent, SkyDropdownModule, WelcomeComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
})
export class MainMenuComponent {
  @Input()
  public user?: User;

  handleUser(user: any) {
    this.user = user;
  }
}
