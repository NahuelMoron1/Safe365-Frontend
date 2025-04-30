import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [NavBarComponent, WelcomeComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css',
})
export class MainMenuComponent {}
