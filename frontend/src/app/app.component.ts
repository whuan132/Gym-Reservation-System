import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <div>
    <nav>
      <ul>
        <li>
          <a [routerLink]="['signup']">SignUp</a>
        </li>
        <li><a [routerLink]="['signin']">Sign-In</a></li>
        <li>
          <a [routerLink]="['change_password']">ChangePassword</a>
        </li>
        
      </ul>
    </nav>
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent {}
