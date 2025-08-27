import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyModalService } from '@skyux/modals';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { environment } from '../../../environments/environment';
import { PasswordModalComponent } from '../../../modals/password-modal/password-modal.component';
import { Socialwork } from '../../../models/Socialwork';
import { User } from '../../../models/User';
import { UserRole } from '../../../models/enums/UserRole';
import { UserStatus } from '../../../models/enums/UserStatus';
import { ErrorService } from '../../../services/error.service';
import { SocialworksService } from '../../../services/socialworks.service';
import { UserService } from '../../../services/user.service';
import { UtilsService } from '../../../services/utils.service';
import { USER } from '../../../tokens/token';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-settings',
  imports: [NgIf, NgFor, FormsModule, NavBarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  @Input()
  public user?: User;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private toastSvc = inject(SkyToastService);
  private socialworkService = inject(SocialworksService);
  private userService = inject(UserService);
  private errorService = inject(ErrorService);
  private instance = inject(SkyModalService);

  public socialWorks?: Socialwork[];
  public socialwork?: string;
  public socialworkCompleted?: Socialwork;
  public selectedRole?: string;
  public imagePreview?: string | null;
  public selectedFile: File | null = null;
  public loggedRole?: string;
  public bffUrl: string = environment.endpoint;
  private password?: string;

  async handleUser(user: any) {
    this.user = user;
    this.imagePreview = user.profileImage;
    try {
      await this.getSocialworks();
      this.loggedRole = this.user?.role;
      await this.openPasswordModal();
    } catch (error) {
      return this.errorService.handleError(error, 'Error leyendo obra social');
    }
  }

  async openPasswordModal() {
    try {
      const modalRef = this.instance.open(PasswordModalComponent, {
        providers: [
          {
            provide: USER,
            useValue: this.user,
          },
        ],
      });

      const result = await modalRef.closed.toPromise();

      if (!result || !result.data) {
        return;
      }

      const valid = result.data;

      if (!valid.status) {
        return this.errorService.handleError(undefined, valid.message);
      }
      this.password = valid.password;
    } catch (error) {
      return this.errorService.handleError(
        error,
        'Error al verificar contraseña'
      );
    }
  }

  async getSocialworks() {
    this.socialWorks = await this.socialworkService.getActiveSocialworksTC();
    if (this.socialWorks?.length) {
      const selectSocialwork = new Socialwork(
        '0',
        'Seleccionar obra social',
        true
      );
      const noSocialwork = new Socialwork('1', 'Sin obra social', true);
      this.socialWorks.push(noSocialwork);
      this.socialWorks.unshift(selectSocialwork);

      this.socialworkCompleted =
        this.socialWorks.find((sw) => sw.id === this.user?.socialworkID) ||
        selectSocialwork;

      this.socialwork = this.socialworkCompleted?.name;
    }
  }

  async modifyUserdata() {
    if (!this.user) {
      return this.errorService.handleError(
        undefined,
        'No ha iniciado sesión para acceder a esta parte del sistema'
      );
    }

    const dataModified: User | undefined = this.getAllUserData();

    if (!dataModified) {
      return;
    }

    try {
      await this.userService.modifyUser(dataModified).toPromise();
      UtilsService.openToast(
        this.toastSvc,
        'Datos modificados correctamente',
        SkyToastType.Success
      );
    } catch (error) {
      return this.errorService.handleError(
        error,
        'No se pudo modificar los datos del usuario'
      );
    }
  }

  getAllUserData() {
    const fullName = this.getString('fullNameInp');
    const email = this.getString('emailInp');
    const phone = this.getString('phoneInp');
    const userID = this.getString('userIDInp');
    const userRole = this.getString('userRoleInp');
    const speciality = this.getString('specialityInp');
    const status = this.getString('statusInp');

    if (!this.validateUserdata(fullName, email, phone, userID)) {
      return undefined;
    }

    const userdata: User = new User(
      fullName,
      email,
      phone,
      userID,
      this.socialworkCompleted?.id || '',
      this.user?.directions || '',
      this.password,
      this.user?.role,
      this.user?.profileImage,
      this.user?.id
    );

    if (this.selectedFile) {
      userdata.temporaryFile = this.selectedFile;
    }

    if (!userRole) {
      return userdata;
    }
    switch (userRole) {
      case 'admin':
        userdata.role = UserRole.ADMIN;
        break;
      case 'attendant':
        userdata.role = UserRole.ATTENDANT;
        if (!speciality) {
          UtilsService.openToast(
            this.toastSvc,
            'Necesita indicar la especialidad del médico',
            SkyToastType.Danger
          );
          return undefined;
        }
        userdata.speciality = speciality;
        break;
      case 'client':
        userdata.role = UserRole.CLIENT;
        break;
    }
    if (!status) {
      //Si no hay status es porque esta declarando al usuario activo, lo hace por default en workbench
      return userdata;
    }
    userdata.status = UserStatus.INACTIVE; //Aca llega si encuentra el estatus, entonces si o si lo va a marcar inactivo porque solo va a tener la opcion de marcarlo inactivo o no marcar nada
    return userdata;
  }

  validateUserdata(
    fullName: string,
    email: string,
    phone: string,
    userID: string
  ) {
    if (
      !fullName ||
      !email ||
      !phone ||
      !userID ||
      this.socialworkCompleted?.id === '0'
    ) {
      UtilsService.openToast(
        this.toastSvc,
        'No todos los campos contienen un valor',
        SkyToastType.Danger
      );
      return false;
    }
    return true;
  }

  getString(name: string) {
    const inpAux = document.getElementById(name) as HTMLInputElement;
    let input = '';
    if (inpAux) {
      input = inpAux.value;
    }
    return input;
  }

  getNumber(name: string) {
    const inpAux = document.getElementById(name) as HTMLInputElement;
    let input = 0;
    if (inpAux) {
      input = parseInt(inpAux.value);
    }
    return input;
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (!this.selectedFile.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async changeSocialwork(event: Event | string) {
    const selectedValue =
      typeof event === 'string'
        ? event
        : (event.target as HTMLSelectElement).value;
    const selectedSocialwork = this.socialWorks?.find(
      (sw) => sw.name === selectedValue
    );
    if (selectedSocialwork) {
      this.socialwork = selectedSocialwork.name;
      this.socialworkCompleted = selectedSocialwork;
    }
  }

  changeRole(event: Event | string) {
    const selectedValue =
      typeof event === 'string'
        ? event
        : (event.target as HTMLSelectElement).value;

    this.selectedRole = selectedValue;
    if (this.selectedRole !== 'attendant') {
      const specInput = document.getElementById(
        'specialityInp'
      ) as HTMLInputElement;
      if (specInput) {
        specInput.value = '';
      }
    }
  }

  isAdmin() {
    if (this.loggedRole === UserRole.ADMIN) {
      return true;
    }
    return false;
  }
}
