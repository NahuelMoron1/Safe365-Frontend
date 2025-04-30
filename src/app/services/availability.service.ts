import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CookieService } from './cookie.service';
import { Availability } from '../models/Availability';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private myAppUrl: string;
  private myApiUrl: string;
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/availability/';
  }

  ///GET ATTENDANT AVAILABILITY

  async getAttendantAvailabilityTC(attendantID: string) {
    try {
      const data = await this.getAttendantAvailability(attendantID).toPromise();
      if (data) {
        const AttendantAvailability: Availability[] = data;
        return AttendantAvailability;
      }
      return undefined;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getAttendantAvailability(attendantID: string): Observable<Availability[]> {
    return this.http.get<Availability[]>(
      this.myAppUrl + this.myApiUrl + attendantID,
      {
        withCredentials: true,
      }
    );
  }

  ///CREATE A NEW AVAILABILITY (ONLY FOR ATTENDANTS)

  setAttendantAvailability(availability: Availability): Observable<void> {
    const body = {
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
    };
    if (this.cookieService.isLogged) {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, body, {
        withCredentials: true,
      });
    }
    return of(undefined);
  }

  ///MODIFY AN EXISTING AVAILABILITY (ONLY FOR ATTENDANTS)

  modifyAttendantAvailability(availability: Availability): Observable<void> {
    const body = {
      id: availability.id,
      dayOfWeek: availability.dayOfWeek,
      startTime: availability.startTime,
      endTime: availability.endTime,
    };
    if (this.cookieService.isLogged) {
      return this.http.post<void>(
        `${this.myAppUrl}${this.myApiUrl}modify`,
        body,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }

  ///CHECK IF AN ATTENDANT IS AVAILABLE

  checkAttendantAvailability(
    attendantID: string,
    date: Date
  ): Observable<boolean> {
    const body = {
      attendantID: attendantID,
      date: date,
    };
    return this.http.post<boolean>(
      `${this.myAppUrl}${this.myApiUrl}check`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  ///DELETE AN OWN AVAILABILITY FOR AN ATTENDANT

  deleteAttendantAvailability(availabilityID: string): Observable<void> {
    if (this.cookieService.isLogged) {
      return this.http.delete<void>(
        `${this.myAppUrl}${this.myApiUrl}${availabilityID}`,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }
}
