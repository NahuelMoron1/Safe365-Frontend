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
    if (err.status === 404) {
      return;
    }
    const errMessage = `${message} - ${UtilsService.errorText(err)}`;
    UtilsService.openToast(this.toastSvc, errMessage, SkyToastType.Danger);
  }
}
