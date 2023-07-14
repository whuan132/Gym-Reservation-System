import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-signin',
    template: `
        <h3>Please login</h3>
        <div>
            <form [formGroup]="signInForm" (ngSubmit)="signIn()">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" formControlName="email" placeholder="Email"/>
                </div>
                <div *ngIf=" email.invalid && email.touched && email.errors?.['require']">Email is required</div>
                <div *ngIf=" email.invalid && email.touched && email.errors?.['email']">Email is not valid</div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" formControlName="password" placeholder="Password"/>
                </div>
                <button type="submit" [disabled]="signInForm.invalid">Sign In</button>
            </form>
        </div>
    `,
    styles: [
        `.form-group {
            margin-bottom: 10px;
        }

        label {
            margin-bottom: 5px;
        }`
    ]
})
export class SigninComponent {
    signInForm = inject(FormBuilder).group({
        fullname: [''],
        email: ['', Validators.compose([Validators.email, Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],

    })
    #router = inject(Router);
    #authService = inject(AuthService);


    signIn() {
        // console.log((this.signInForm.value))
        const obj = {
            ...this.signInForm.value,
        } as { email: string; password: string };

        this.#authService
            .signin(obj)
            .subscribe((res) => {
                // console.log("login result: " + JSON.stringify(res));
                if (res && res.success) {
                    this.#authService.jwt.set(res.data);
                    // this.#router.navigate(["/home"]);
                }
            });
    }

    get email() {
        return this.signInForm.get('email') as FormControl;
    }

    ngOnInit() {
    }
}
