import { Component, Input } from "@angular/core";

@Component({
  selector: "app-toast",
  template: `
    <div
      id="toast-success"
      class="flex fixed  z-10 right-2 top-28 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">{{ message }}</div>
    </div>
  `,
  styles: [],
})
export class ToastComponent {
  @Input({ required: true, alias: "message" }) message!: string;
}
