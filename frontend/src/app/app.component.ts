import { Component, inject } from "@angular/core";
import { ToastService } from "./toast.service";

@Component({
  selector: "app-root",
  template: ` <section class="bg-white dark:bg-gray-900">
    <app-nav />
    <div class="flex flex-col h-screen md:justify-between">
      <app-toast
        *ngIf="toastService.toast().show"
        [message]="toastService.toast().message"
      />

      <div class="self-start w-full">
        <router-outlet></router-outlet>
      </div>

      <app-footer />
    </div>
  </section>`,
  styles: [],
})
export class AppComponent {
  toastService = inject(ToastService);
}
