import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyDropdownModule } from '@skyux/popovers';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [SkyAlertModule, SkyNavbarModule, SkyDropdownModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {}
