import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IUser } from "../types/user.interface";

@Component({
  selector: "app-signup",
  template: `
    <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
      <h2 class="mb-4 items-start text-5xl font-extrabold dark:text-white">
        Create a new Account
      </h2>

      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
      >
        <div
          class="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              class="space-y-4 md:space-y-6"
              [formGroup]="signupForm"
              (ngSubmit)="signup()"
            >
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your name</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required="true"
                  formControlName="name"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  autocomplete="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required="true"
                  formControlName="email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="new-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                  formControlName="password"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Re-enter password</label
                >
                <input
                  type="password"
                  name="password"
                  autocomplete="new-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                  formControlName="rePassword"
                  (keyup)="comparePassword()"
                />
                <p class="text-xs text-red-500" *ngIf="!passwordMatch">
                  *password does not match
                </p>
              </div>

              <button
                type="submit"
                class=" w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:bg-purple-400 disabled:cursor-not-allowed"
                [disabled]="signupForm.status === 'INVALID' || !passwordMatch"
              >
                Sign up
              </button>
              <p class="text-sm  font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  [routerLink]="['', 'signin']"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign in</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  passwordMatch = true;
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.min(3)]],
      rePassword: ["", [Validators.required, Validators.min(3)]],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      const user = { name, email, password } as IUser;
      this.authService.signup(user).subscribe(
        (res) => {
          if (res.success) {
            this.authService.jwt.set(res.data);
            this.router.navigate(["/home"]);
          }
        },
        (error) => {
          console.error("Signup error:", error);
        },
      );
    }
  }

  comparePassword() {
    this.passwordMatch =
      this.signupForm.value.password === this.signupForm.value.rePassword;
    console.log(this.signupForm.status);
    console.log(this.passwordMatch);
  }
}
