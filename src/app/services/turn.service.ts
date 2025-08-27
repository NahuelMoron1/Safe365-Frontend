import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { AttendantHours } from '../models/AttendantHours';
import { Turn } from '../models/Turn';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  private myAppUrl: string;
  private myApiUrl: string;

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  constructor() {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/turns/';
  }

  /*This is user's functionality*/

  ///GET ALL USER TURNS

  async getAllUserTurnsTC() {
    try {
      const data = await this.getAllUserTurns().toPromise();
      if (data) {
        const userTurns: Turn[] = data;
        return userTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getAllUserTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(this.myAppUrl + this.myApiUrl + 'user', {
      withCredentials: true,
    });
  }

  ///GET SCHEDULED USER TURNS

  async getScheduledUserTurnsTC() {
    try {
      const data = await this.getScheduledUserTurns().toPromise();
      if (data) {
        const userTurns: Turn[] = data;
        return userTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getScheduledUserTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'user/scheduled',
      {
        withCredentials: true,
      }
    );
  }

  ///GET COMPLETED USER TURNS

  async getCompletedUserTurnsTC() {
    try {
      const data = await this.getCompletedUserTurns().toPromise();
      if (data) {
        const userTurns: Turn[] = data;
        return userTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCompletedUserTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'user/completed',
      {
        withCredentials: true,
      }
    );
  }

  ///GET CANCELED USER TURNS

  async getCanceledUserTurnsTC() {
    try {
      const data = await this.getCanceledUserTurns().toPromise();
      if (data) {
        const userTurns: Turn[] = data;
        return userTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCanceledUserTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'user/canceled',
      {
        withCredentials: true,
      }
    );
  }

  ///GET NOT SCHEDULED USER TURNS

  async getNotScheduledUserTurnsTC() {
    try {
      const data = await this.getNotScheduledUserTurns().toPromise();
      if (data) {
        const userTurns: Turn[] = data;
        return userTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error;
    }
  }

  getNotScheduledUserTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'user/notScheduled',
      {
        withCredentials: true,
      }
    );
  }

  ///ADD COMMENTS TO A TURN

  addCommentsAdmin(turnID: string, comments: string): Observable<void> {
    if (this.cookieService.isLogged) {
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApiUrl}turns/comments/${turnID}`,
        { comments },
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }

  ///CREATE A NEW TURN

  createTurn(newTurn: Turn): Observable<void> {
    const dateFormatted = this.modifyDateForTurn(newTurn.date);
    console.log(dateFormatted);

    const body = {
      attendantID: newTurn.attendantID,
      date: dateFormatted,
      place: newTurn.place,
    };

    if (this.cookieService.isLogged) {
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApiUrl}user/create`,
        body,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }

  modifyDateForTurn(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 🔹 Fijate: usamos espacio en vez de T
    const formatted = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formatted;
  }

  /*This is attendant's | admin's functionality*/

  ///GET ALL ATTENDANT TURNS

  async getAllAttendantTurnsTC() {
    try {
      const data = await this.getAllAttendantTurns().toPromise();
      if (data) {
        const attendantTurns: Turn[] = data;
        return attendantTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getAllAttendantTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(this.myAppUrl + this.myApiUrl + 'attendant', {
      withCredentials: true,
    });
  }

  ///GET SCHEDULED ATTENDANT TURNS

  async getScheduledAttendantTurnsTC() {
    try {
      const data = await this.getScheduledAttendantTurns().toPromise();
      if (data) {
        const attendantTurns: Turn[] = data;
        return attendantTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getScheduledAttendantTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'attendant/scheduled',
      {
        withCredentials: true,
      }
    );
  }

  async getCompletedAttendantTurnsTC() {
    try {
      const data = await this.getCompletedAttendantTurns().toPromise();
      if (data) {
        const attendantTurns: Turn[] = data;
        return attendantTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCompletedAttendantTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'attendant/completed',
      {
        withCredentials: true,
      }
    );
  }

  async getCanceledAttendantTurnsTC() {
    try {
      const data = await this.getCanceledAttendantTurns().toPromise();
      if (data) {
        const attendantTurns: Turn[] = data;
        return attendantTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCanceledAttendantTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'attendant/canceled',
      {
        withCredentials: true,
      }
    );
  }

  ///GET SCHEDULED ADMIN TURNS

  async getScheduledAdminTurnsTC() {
    try {
      const data = await this.getScheduledAdminTurns().toPromise();
      if (data) {
        const adminTurns: Turn[] = data;
        return adminTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getScheduledAdminTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'admin/scheduled',
      {
        withCredentials: true,
      }
    );
  }

  async getCompletedAdminTurnsTC() {
    try {
      const data = await this.getCompletedAdminTurns().toPromise();
      if (data) {
        const adminTurns: Turn[] = data;
        return adminTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCompletedAdminTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'admin/completed',
      {
        withCredentials: true,
      }
    );
  }

  async getCanceledAdminTurnsTC() {
    try {
      const data = await this.getCanceledAdminTurns().toPromise();
      if (data) {
        const adminTurns: Turn[] = data;
        return adminTurns;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCanceledAdminTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>(
      this.myAppUrl + this.myApiUrl + 'admin/canceled',
      {
        withCredentials: true,
      }
    );
  }

  validateAttendantTurnsByDate(
    attendantID: string,
    startHour: number,
    endHour: number,
    date: Date
  ): Observable<AttendantHours> {
    return this.http.post<AttendantHours>(
      this.myAppUrl + this.myApiUrl + `turns/attendant/${attendantID}`,
      { startHour, endHour, date },
      {
        withCredentials: true,
      }
    );
  }

  ///CREATE A NEW TURN (ATTENDANT ONLY)

  attendantCreateTurn(newTurn: Turn): Observable<void> {
    const body = {
      userID: newTurn.attendantID,
      date: newTurn.date,
      place: newTurn.place,
    };
    if (this.cookieService.isLogged) {
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApiUrl}attendant/create`,
        body,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }

  ///CANCEL AN EXISTING TURN (ATTENDANT ONLY)

  cancelTurn(turnID: string): Observable<void> {
    if (this.cookieService.isLogged) {
      return this.http.get<void>(
        `${this.myAppUrl}${this.myApiUrl}attendant/cancel/${turnID}`,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }

  ///COMPLETE AN EXISTING TURN (ATTENDANT ONLY)

  completeTurn(turnID: string): Observable<void> {
    if (this.cookieService.isLogged) {
      return this.http.get<void>(
        `${this.myAppUrl}${this.myApiUrl}attendant/complete/${turnID}`,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }
}
