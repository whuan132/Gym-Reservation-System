import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <div>
    <nav>
      <ul>
        <li>
          <a [routerLink]="['signup']">SignUp</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent {}
