import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(AuthService).jwt();
  if (jwt) {
    const withSignatureReq = req.clone({
      headers: req.headers.set("Authorization", `Bear ${jwt}`),
    });
    return next(withSignatureReq);
  }
  return next(req);
};
