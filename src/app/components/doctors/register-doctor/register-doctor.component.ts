import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../../models/User';
import { UserRole } from '../../../models/enums/UserRole';
import { Socialwork } from '../../../models/Socialwork';
import { SocialworksService } from '../../../services/socialworks.service';
import { UserStatus } from '../../../models/enums/UserStatus';
import { SkyCardModule } from '@skyux/layout';
import { SkyInputBoxModule } from '@skyux/forms';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { UserService } from '../../../services/user.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-register-doctor',
  imports: [SkyCardModule, SkyInputBoxModule, NgIf, NgFor, FormsModule],
  templateUrl: './register-doctor.component.html',
  styleUrl: './register-doctor.component.css',
})
export class RegisterDoctorComponent implements OnInit {
  @Input()
  public user?: User;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private socialworkService = inject(SocialworksService);
  private userService = inject(UserService);
  private toastSvc = inject(SkyToastService);
  private errorService = inject(ErrorService);

  public socialWorks?: Socialwork[];
  public socialwork?: string;
  public socialworkCompleted?: Socialwork;
  public selectedRole?: string;
  public imagePreview?: string | null;
  public selectedFile: File | null = null;

  async ngOnInit() {
    await this.getSocialworks();
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
      this.socialwork = this.socialWorks[0].name;
      this.socialworkCompleted = this.socialWorks[0];
    }
  }

  async registerUser() {
    if (this.user && !this.isAdmin()) {
      return this.errorService.handleError(
        undefined,
        'No tiene los permisos para registrar un nuevo usuario'
      );
    }
    const user = this.getAllUserData();
    if (!user) {
      return;
    }
    try {
      await this.userService.saveUser(user).toPromise();
      UtilsService.openToast(
        this.toastSvc,
        'Registro correcto, inicie sesión con sus credenciales',
        SkyToastType.Success
      );
    } catch (error: any) {
      return this.errorService.handleError(
        error,
        'No se pudo registrar nuevo usuario'
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
    const password = this.getString('passwordInp');

    if (!this.validateUserdata(fullName, email, phone, userID, password)) {
      return undefined;
    }

    let userdata: User = new User(
      fullName,
      email,
      phone,
      userID,
      this.socialworkCompleted?.id || '',
      password
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
    userID: string,
    password: string
  ) {
    if (
      !fullName ||
      !email ||
      !phone ||
      !userID ||
      !password ||
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
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: string = '';
    if (inpAux) {
      input = inpAux.value;
    }
    return input;
  }

  getNumber(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: number = 0;
    if (inpAux) {
      input = parseInt(inpAux.value);
    }
    return input;
  }

  isAdmin() {
    if (this.user?.role === UserRole.ADMIN) {
      return true;
    }
    return false;
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
}
