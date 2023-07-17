import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-signin",
  template: `
    <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
      <h2 class="mb-4 items-start text-5xl font-extrabold dark:text-white">
        Sign in to your account
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
              [formGroup]="signInForm"
              (ngSubmit)="signIn()"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
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
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                  formControlName="password"
                />
              </div>
              <div>
                <label
                  for="role"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Role</label
                >
                <select
                  id="role"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                  formControlName="role"
                >
                  <option value="admin">Administrator</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <button
                type="submit"
                class=" w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:bg-purple-400 disabled:cursor-not-allowed"
                [disabled]="signInForm.invalid"
              >
                Sign in
              </button>

              <p class="text-sm  font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  [routerLink]="['', 'signup']"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign up</a
                >
              </p>

              <div *ngIf="error">
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {{ error }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SigninComponent {
  signInForm = inject(FormBuilder).group({
    email: ["", Validators.compose([Validators.email, Validators.required])],
    password: [
      "",
      Validators.compose([Validators.minLength(3), Validators.required]),
    ],
    role: ["customer", Validators.compose([Validators.required])],
  });
  error: string = "";
  #router = inject(Router);
  #authService = inject(AuthService);

  constructor() {
    this.signInForm.valueChanges.subscribe(() => {
      this.error = "";
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }

    console.log(this.signInForm.value);
    const { email, password, role } = this.signInForm.value;
    if (!email || !password || !role) {
      return;
    }
    const obj = {
      email: email,
      password: password,
      role: role,
    };

    this.#authService.signin(obj).subscribe(
      async (res) => {
        console.log("login result: ", res);
        if (res && res.success) {
          this.#authService.jwt.set(res.data);
          await this.#router.navigate(["/home"]);
          return;
        }
        this.error = "Sign in failed, please try again.";
      },
      (error) => {
        console.log(error);
        this.error = "Sign in failed, please try again.";
      },
    );
  }
}
