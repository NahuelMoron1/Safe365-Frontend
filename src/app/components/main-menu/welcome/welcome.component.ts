import { Component, Input } from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyBoxModule } from '@skyux/layout';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyDropdownModule } from '@skyux/popovers';
import { User } from '../../../models/User';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [SkyAlertModule, SkyNavbarModule, SkyDropdownModule, SkyBoxModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  @Input()
  public user?: User;
}
