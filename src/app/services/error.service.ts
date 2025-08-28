import { inject, Injectable } from '@angular/core';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public toastSvc = inject(SkyToastService);

  public handleError(err: any, message: string) {
    let errMessage = `${message}`;
    if (err) {
      errMessage += `- ${UtilsService.errorText(err)}`;
    }
    /*if (err && err.status === 404) {
      return;
    }*/
    UtilsService.openToast(this.toastSvc, errMessage, SkyToastType.Danger);
  }
}
