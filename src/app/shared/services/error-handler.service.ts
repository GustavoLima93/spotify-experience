import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private zone: NgZone, private injector: Injector) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const router = this.injector.get(Router);
      const message = JSON.stringify(errorResponse.error);
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            router.navigate(['/login']);
            break;
          case 403:
            console.error(message);
            break;
          case 404:
            console.error(message);
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
