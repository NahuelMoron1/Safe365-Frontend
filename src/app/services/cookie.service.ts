import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserRole } from '../models/enums/UserRole';
import { UserStatus } from '../models/enums/UserStatus';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private myAppUrl: string;
  private myApiUrl: string;
  user: User = new User('', '', '', '', '', UserRole.CLIENT, UserStatus.ACTIVE);
  _user: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  isLogged: boolean = false;
  _islogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isLogged
  );

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cookie/';
  }

  returnUser() {
    return this._user.asObservable();
  }

  returnLogged() {
    return this._islogged.asObservable();
  }

  ///GET USER INFORMATION

  async getUser() {
    (await this.tokenExistTC('access_token')).subscribe((data) => {
      this.isLogged = data;
    });
    if (this.isLogged) {
      let userAux = await this.getTokenTC('access_token');
      if (userAux != null) {
        this.user = userAux;
        this._user.next(this.user);
      }
    }
    return this._user.asObservable();
  }

  async tokenExistTC(cookieName: string) {
    let tokenAux = await this.tokenExist(cookieName).toPromise();
    if (tokenAux != undefined) {
      this.isLogged = tokenAux;
      this._islogged.next(this.isLogged);
    }
    return this._islogged.asObservable();
  }

  tokenExist(cookieName: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.myAppUrl + this.myApiUrl + 'check/' + cookieName,
      {
        withCredentials: true, // Esto permite que las cookies se envíen y se reciban
      }
    );
  }

  async getTokenTC(cookieName: string) {
    let data = await this.getToken(cookieName).toPromise();
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  getToken(cookieName: string): Observable<User | null> {
    return this.http
      .get<User>(`${this.myAppUrl}${this.myApiUrl}get/${cookieName}`, {
        withCredentials: true, // Esto permite que las cookies se envíen y se reciban
      })
      .pipe(
        catchError((error) => {
          console.error(`Error al obtener el token para ${cookieName}:`, error);
          return of(null); // Retorna `null` en caso de error para manejarlo de forma segura
        })
      );
  }
}
