import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserRole } from '../models/enums/UserRole';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AttendantXSocialworkService {
  private myAppUrl: string;
  private myApiUrl: string;

  public user: User = new User('', '', '', '', '', UserRole.CLIENT);

  private http = inject(HttpClient);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/attendantXSocialwork/';
  }

  //CREATE AttendantXSocialwork

  postSocialwork(attendantXSocialwork: any): Observable<void> {
    return this.http.post<void>(
      this.myAppUrl + this.myApiUrl,
      attendantXSocialwork,
      {
        withCredentials: true,
      }
    );
  }

  //DELETE AttendantXSocialwork

  deleteSocialwork(
    attendantID: string,
    socialworkID: string
  ): Observable<void> {
    return this.http.delete<void>(
      this.myAppUrl +
        this.myApiUrl +
        'delete/' +
        attendantID +
        '/' +
        socialworkID,
      {
        withCredentials: true,
      }
    );
  }
}
