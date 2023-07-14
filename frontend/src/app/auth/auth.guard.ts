import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { ToastService } from "../toast.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (!authService.isSignedIn) {
    inject(ToastService).showNotification("You must be signed in.");
    inject(Router).navigate(["", "signin"]);
    return false;
  }
  return true;
};
