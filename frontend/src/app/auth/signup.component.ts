import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IUser } from "../types/user.interface";

@Component({
  selector: "app-signup",
  template: `
    <p>SignUp</p>
    <form [formGroup]="signupForm" (ngSubmit)="signup()">
      <div>
        <input type="text" placeholder="name" formControlName="name" />
        <input type="text" placeholder="email" formControlName="email" />
        <input
          type="password"
          placeholder="password"
          formControlName="password"
        />
      </div>
      <button type="submit">SignUp</button>
    </form>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
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
      password: ["", Validators.required],
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
            //this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error("Signup error:", error);
        },
      );
    }
  }
}
