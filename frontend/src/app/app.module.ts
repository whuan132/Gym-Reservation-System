import { APP_INITIALIZER, inject, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { authInterceptor } from "./auth/auth.interceptor";
import { SignupComponent } from "./auth/signup.component";
import { ChangePasswordComponent } from "./auth/change.password.component";
import { SigninComponent } from "./auth/signin.component";
import { NavComponent } from "./nav.component";
import { ToastComponent } from "./toast.component";
import { FooterComponent } from "./footer.component";
import { HomeComponent } from "./home.component";
import { AboutComponent } from "./about.component";
import { AuthService } from "./auth/auth.service";
import { NgIf } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { authGuard } from "./auth/auth.guard";
import IconHelper from "./utils/IconHelper";

function bootstrap() {
  const authService = inject(AuthService);
  return () => {
    authService.bootstrap();
    IconHelper.bootstrap();
  };
}

const MY_ROUTES: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "signin", component: SigninComponent, title: "Sign In" },
  { path: "signup", component: SignupComponent, title: "Sign Up" },
  {
    path: "change_password",
    component: ChangePasswordComponent,
    title: "Change Password",
  },
  { path: "about", component: AboutComponent, title: "About" },

  {
    path: "reservation",
    loadChildren: () =>
      import("./reservation/reservation.module").then(
        (m) => m.ReservationModule,
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
    NavComponent,
    ToastComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(MY_ROUTES, { bindToComponentInputs: true }),
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIf,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: bootstrap, multi: true },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
