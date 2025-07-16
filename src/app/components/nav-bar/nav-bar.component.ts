import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SkyAlertModule } from '@skyux/indicators';
import { SkyNavbarModule } from '@skyux/navbar';
import { User } from '../../models/User';
import { UserRole } from '../../models/enums/UserRole';
import { UserStatus } from '../../models/enums/UserStatus';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SkyDropdownModule } from '@skyux/popovers';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    SkyAlertModule,
    SkyNavbarModule,
    SkyDropdownModule,
    NgIf,
    RouterModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  userService = inject(UserService);
  @Output() userOutput = new EventEmitter<User>(); // Emitimos el valor 'user'
  user?: User;

  async ngOnInit() {
    this.user = await this.userService.getUserLogged();
    this.userOutput.emit(this.user);
  }
  protected onDropdownItemClick(buttonText: string): void {
    alert(buttonText + ' button clicked!');
  }
  async logout() {
    await this.userService.logoutTC();
    location.reload();
  }
  isAdmin() {
    if (this.user?.role === UserRole.ADMIN) {
      return true;
    }
    return false;
  }
}
