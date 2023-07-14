import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {authInterceptor} from "./auth/auth.interceptor";
import {SignupComponent} from "./auth/signup.component";
import {ChangePasswordComponent} from "./auth/change.password.component";
import {SigninComponent} from "./auth/signin.component";

const MY_ROUTES: Routes = [
    {path: "signup", component: SignupComponent, title: "SignUp"},
    {
        path: "change_password",
        component: ChangePasswordComponent,
        title: "ChangePassword",
    },
    { path: "signin", component: SigninComponent, title: "signIn"}

];

@NgModule({
    declarations: [AppComponent, SignupComponent, SigninComponent, ChangePasswordComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(MY_ROUTES, {bindToComponentInputs: true}),
        ReactiveFormsModule,
    ],
    providers: [provideHttpClient(withInterceptors([authInterceptor]))],
    bootstrap: [AppComponent],
})
export class AppModule {
}
