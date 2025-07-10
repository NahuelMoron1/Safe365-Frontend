import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserRole } from '../models/enums/UserRole';
import { UserStatus } from '../models/enums/UserStatus';
import { User } from '../models/User';
import { CookieService } from './cookie.service';
import { Observable } from 'rxjs';
import { Socialwork } from '../models/Socialwork';

@Injectable({
  providedIn: 'root',
})
export class SocialworksService {
  private myAppUrl: string;
  private myApiUrl: string;
  user: User = new User('', '', '', '', '', UserRole.CLIENT);
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/socialworks/';
  }

  ///GET ACTIVE Socialworks

  async getActiveSocialworksTC() {
    try {
      const data = await this.getActiveSocialworks().toPromise();
      if (data) {
        const activeSocialworks: Socialwork[] = data;
        return activeSocialworks;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getActiveSocialworks(): Observable<Socialwork[]> {
    return this.http.get<Socialwork[]>(
      this.myAppUrl + this.myApiUrl + 'socialworks/active',
      {
        withCredentials: true,
      }
    );
  }

  ///GET INACTIVE Socialworks

  async getinActiveSocialworksTC() {
    try {
      const data = await this.getinActiveSocialworks().toPromise();
      if (data) {
        const inactiveSocialworks: Socialwork[] = data;
        return inactiveSocialworks;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getinActiveSocialworks(): Observable<Socialwork[]> {
    return this.http.get<Socialwork[]>(
      this.myAppUrl + this.myApiUrl + 'socialworks/inactive',
      {
        withCredentials: true,
      }
    );
  }

  ///GET ALL Socialworks

  async getAllSocialworksTC() {
    try {
      const data = await this.getAllSocialworks().toPromise();
      if (data) {
        const allSocialworks: Socialwork[] = data;
        return allSocialworks;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getAllSocialworks(): Observable<Socialwork[]> {
    return this.http.get<Socialwork[]>(
      this.myAppUrl + this.myApiUrl + 'socialworks/all',
      {
        withCredentials: true,
      }
    );
  }

  ///SET Socialwork TO ACTIVE

  setActiveSocialwork(SocialworkID: string): Observable<string> {
    return this.http.get<string>(
      this.myAppUrl + this.myApiUrl + `set/active/${SocialworkID}`,
      {
        withCredentials: true,
      }
    );
  }

  ///SET Socialwork TO INACTIVE

  setinActiveSocialwork(SocialworkID: string): Observable<string> {
    return this.http.get<string>(
      this.myAppUrl + this.myApiUrl + `set/inactive/${SocialworkID}`,
      {
        withCredentials: true,
      }
    );
  }
}
