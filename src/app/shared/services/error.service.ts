import { inject, Injectable } from '@angular/core';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { SlackService } from './slack.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public toastSvc = inject(SkyToastService);

  public static errorText(err: any) {
    return UtilsService.errorText(err);
  }

  public handleError(err: any, message: string, payload?: any) {
    let errMessage = `${message}`;
    if (err) {
      errMessage += `- ${UtilsService.errorText(err)}`;
    }

    UtilsService.openToast(this.toastSvc, errMessage, SkyToastType.Danger);

    const postError = ErrorService.postError(err.error.message);

    if (postError) {
      // post error
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      SlackService.postErrorNotification(payload).subscribe(() => {});
    } else {
      // don't post error
      //SlackService.postNotification({ rawMessage: message, token: token });
    }
  }

  public static postError(err: any) {
    /*const is403 = err?.status === 403;
    if (is403) {
      return false;
    }

    const is404 = err?.status === 404;
    if (is404) {
      return false;
    }

    const is500 = err?.status === 500;
    if (is500) {
      // these are logged in devops, no need to post ui error
      return false;
    }

    if (!err?.status) {
      // don't post error for timeouts
      return false;
    }*/

    const errText = ErrorService.errorText(err);
    const suppressErrorMsg = ErrorService.suppressErrorMessage(errText);
    if (suppressErrorMsg) {
      return false;
    }

    return true;
  }

  private static suppressErrorMessage(msg: string) {
    // suppress these error messages, they are usually 400s from the server that we can safely ignore
    const ignoreMessages = ['No active attendants at the moment'];

    if (ignoreMessages.includes(msg)) {
      return true;
    }

    const regexIgnorePatterns = [/Product \w+ already exists in the catalog\./];

    // Check for regex pattern match
    return regexIgnorePatterns.some((regex) => regex.test(msg));
  }
}
