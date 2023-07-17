import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4 mt-20">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023 <a href="#" class="hover:underline">GymReservation™</a>. All
          Rights Reserved.</span
        >
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
