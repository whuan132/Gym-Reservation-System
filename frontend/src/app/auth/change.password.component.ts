import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change.password",
  template: `
    <p>ChangePasswordForm</p>
    <form [formGroup]="changePasswordForm" (ngSubmit)="signup()">
      <div>
        <input
          type="password"
          placeholder="password"
          formControlName="password"
        />
      </div>
      <button type="submit">submit</button>
    </form>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
    });
  }

  signup() {
    if (this.changePasswordForm.valid) {
      const { password } = this.changePasswordForm.value;
      this.authService.changePassword(password).subscribe(
        (res) => {
          if (res.success) {
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
