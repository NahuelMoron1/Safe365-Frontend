import { Injectable } from '@angular/core';
import { gapi, loadGapiInsideDOM } from 'gapi-script';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private CLIENT_ID =
    '950703538127-5s7j436ici9svrhs73v3g1mtnmfo0mio.apps.googleusercontent.com';
  private API_KEY = 'TU_API_KEY'; // Opcional si vas a hacer llamadas directas
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  async initClient(): Promise<void> {
    await loadGapiInsideDOM();
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
            scope: this.SCOPES,
          });
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  signIn(): Promise<gapi.auth2.GoogleUser> {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

  listEvents(): Promise<any> {
    return (gapi.client as any).calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
  }

  addEvent(event: any): Promise<any> {
    return (gapi.client as any).calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
  }
}
