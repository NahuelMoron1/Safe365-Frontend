import { inject, Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserRole } from '../models/enums/UserRole';
import { UserStatus } from '../models/enums/UserStatus';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  user: User = new User('', '', '', '', '', UserRole.CLIENT, UserStatus.ACTIVE);
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  ///READ USER LOGGED

  async getUserLogged() {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    return this.user;
  }

  ///GET ONE USER BY ID

  async getUserTC(id: string) {
    try {
      const data = await this.getUser(id).toPromise();
      if (data) {
        const user = new User(
          data.id,
          data.fullName,
          data.email,
          data.phone,
          data.userID,
          data.role,
          data.status
        );
        return user;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.myAppUrl + this.myApiUrl + id, {
      withCredentials: true,
    });
  }

  ///GET ACTIVE ATTENDANTS

  async getActiveAttendantsTC() {
    try {
      const data = await this.getActiveAttendants().toPromise();
      if (data) {
        const activeAttendants: User[] = data;
        return activeAttendants;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getActiveAttendants(): Observable<User[]> {
    return this.http.get<User[]>(
      this.myAppUrl + this.myApiUrl + 'attendants/active',
      {
        withCredentials: true,
      }
    );
  }

  ///GET INACTIVE ATTENDANTS

  async getinActiveAttendantsTC() {
    try {
      const data = await this.getinActiveAttendants().toPromise();
      if (data) {
        const inactiveAttendants: User[] = data;
        return inactiveAttendants;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getinActiveAttendants(): Observable<User[]> {
    return this.http.get<User[]>(
      this.myAppUrl + this.myApiUrl + 'attendants/inactive',
      {
        withCredentials: true,
      }
    );
  }

  ///SET ATTENDANT TO ACTIVE

  setActiveAttendant(attendantID: string): Observable<string> {
    return this.http.get<string>(
      this.myAppUrl + this.myApiUrl + `attendants/active/${attendantID}`,
      {
        withCredentials: true,
      }
    );
  }

  ///SET ATTENDANT TO INACTIVE

  setinActiveAttendant(attendantID: string): Observable<string> {
    return this.http.get<string>(
      this.myAppUrl + this.myApiUrl + `attendants/inactive/${attendantID}`,
      {
        withCredentials: true,
      }
    );
  }

  ///GET ONE USER BY NAME

  async getUserByNameTC(name: string) {
    try {
      const data = await this.getUser(name).toPromise();
      if (data) {
        const user = new User(
          data.id,
          data.fullName,
          data.email,
          data.phone,
          data.userID,
          data.role,
          data.status
        );
        return user;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUserByName(name: string): Observable<User> {
    const fullName = encodeURIComponent(name);
    return this.http.get<User>(
      this.myAppUrl + this.myApiUrl + 'name/' + fullName,
      {
        withCredentials: true,
      }
    );
  }

  ///CREATE NEW USER

  saveUser(newUser: User): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, newUser, {
      withCredentials: true,
    });
  }

  ///LOGIN

  async readLogin(email: string, password: string) {
    let userAux = await this.loginTC(email, password);
    if (userAux != null) {
      localStorage.setItem('userLogged', JSON.stringify(userAux)); //Se guarda en local storage una copia del usuario que se loguea, para saber que está logueado en cualquier parte de la pagina
      return true;
    } else {
      return false;
    }
  }

  async loginTC(email: string, password: string) {
    try {
      let userAux = await this.login(email, password).toPromise();
      if (userAux) {
        return userAux;
      } else {
        return null;
      }
    } catch (error: any) {
      if (error.status === 404 && error.error?.message) {
        console.error(error.error.message); // Accediendo al mensaje del backend
      } else {
        console.error('Error desconocido', error);
      }
      return null;
    }
  }

  login(email: string, password: string): Observable<User> {
    const userdata = {
      email,
      password,
    };
    const urlAux = this.myAppUrl + this.myApiUrl + 'login';

    return this.http.post<User>(urlAux, userdata, {
      withCredentials: true, // Esto permite que las cookies se envíen y se reciban
    });
  }

  ///LOGOUT

  async logoutTC() {
    /// TRY CATCH CAllS LOGOUT();
    try {
      let access = await this.logout().toPromise();
      return access;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return false;
    }
  }

  logout(): Observable<void> {
    const urlAux = this.myAppUrl + this.myApiUrl + 'logout';
    return this.http.post<void>(urlAux, '', { withCredentials: true });
  }
}
