import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyBoxModule } from '@skyux/layout';
import { User } from '../../../models/User';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [SkyAlertModule, SkyNavbarModule, SkyDropdownModule, SkyBoxModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnChanges {
  @Input()
  public user?: User;

  ngOnChanges(): void {}
}
