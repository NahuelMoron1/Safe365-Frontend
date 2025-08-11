import { inject, Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { SkyToastService, SkyToastType } from '@skyux/toast';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public toastSvc = inject(SkyToastService);

  constructor() {}

  public handleError(err: any, message: string) {
    let errMessage = `${message}`;
    if (err && err.status === 404) {
      errMessage += `- ${UtilsService.errorText(err)}`;
      return;
    }
    UtilsService.openToast(this.toastSvc, errMessage, SkyToastType.Danger);
  }
}
