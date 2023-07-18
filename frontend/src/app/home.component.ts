import { Component } from "@angular/core";
import IconHelper from "./utils/IconHelper";

@Component({
  selector: "app-home",
  template: `
    <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
      <h2 class="mb-4 items-start text-5xl font-extrabold dark:text-white">
        Gym Reservation
        <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
          MWA Final Project July-2023
        </small>
      </h2>

      <img
        class="mb-2 h-auto max-w-lg rounded-lg"
        [src]="IconHelper.getRandomPicture('home')"
        alt="image description"
      />

      <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        The Gym Reservation System is an online platform that allows users to
        make reservations for various gym services, including fitness classes,
        personal trainer sessions.
      </p>

      <div
        class="mt-12 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
      >
        <a
          [routerLink]="['', 'reservation']"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Back to main
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/maharishi-university/final-project-whuan132"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Source code
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  protected readonly IconHelper = IconHelper;
}
