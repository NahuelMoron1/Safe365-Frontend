import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CookieService } from './cookie.service';
import { Review } from '../models/Review';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private myAppUrl: string;
  private myApiUrl: string;
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/reviews/';
  }

  ///GET ATTENDANT REVIEWS

  async getAttendantReviewsTC(attendantID: string) {
    try {
      const data = await this.getAttendantReviews(attendantID).toPromise();
      if (data) {
        const AttendantReviews: Review[] = data;
        return AttendantReviews;
      }
      return [];
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return [];
    }
  }

  getAttendantReviews(attendantID: string): Observable<Review[]> {
    return this.http.get<Review[]>(
      this.myAppUrl + this.myApiUrl + attendantID,
      {
        withCredentials: true,
      }
    );
  }

  ///CREATE A NEW REVIEW FOR AN ATTENDANT

  setAttendantReview(body: any): Observable<void> {
    if (!body.attendantID || !body.rating) {
      return of(undefined);
    }

    if (this.cookieService.isLogged) {
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, body, {
        withCredentials: true,
      });
    }

    return of(undefined);
  }

  ///DELETE AN OWN REVIEW FOR AN ATTENDANT

  deleteAttendantReview(reviewID: string): Observable<void> {
    if (this.cookieService.isLogged) {
      return this.http.delete<void>(
        `${this.myAppUrl}${this.myApiUrl}${reviewID}`,
        {
          withCredentials: true,
        }
      );
    }
    return of(undefined);
  }
}
