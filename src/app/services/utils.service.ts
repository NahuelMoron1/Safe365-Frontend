import { Injectable } from '@angular/core';
import { SkyToastService, SkyToastType } from '@skyux/toast';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public static openToast(
    toastService: SkyToastService,
    text: string,
    toastType: SkyToastType
  ) {
    const toastSeconds = 4;
    let instance = toastService.openMessage(text, { type: toastType });

    // close toast after a few seconds
    setTimeout(() => instance.close(), toastSeconds * 1000);
  }
}
