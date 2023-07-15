import { Component, inject } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { IGymClass } from "../../types/gym-class.interface";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-gym-class",
  template: `
    <form class="mt-20" [formGroup]="form" (ngSubmit)="go()">
      <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >name</label
        >
        <input
          type="name"
          formControlName="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >description</label
        >
        <input
          type="description"
          formControlName="description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="description"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="capacity"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >capacity</label
        >
        <input
          type="capacity"
          formControlName="capacity"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="capacity"
          required
        />
      </div>
      <div class="mb-6">
        <label>
          StartDate:
          <input
            type="date"
            placeholder="startDate"
            formControlName="startDate"
          />
        </label>
      </div>
      <div class="mb-6">
        <label>
          EndDate:
          <input type="date" placeholder="endDate" formControlName="endDate" />
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Class
      </button>
    </form>
  `,
  styles: [],
})
export class AddGymClassComponent {
  form = inject(FormBuilder).nonNullable.group({
    _id: "",
    name: ["", Validators.required],
    description: ["", Validators.required],
    capacity: [1, Validators.required],
    rating: [0, Validators.required],
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
  });

  #classServer = inject(GymClassesService);
  #classCompont = inject(GymClassesService);
  authService = inject(AuthService);
  #router = inject(Router);

  go() {
    const formValue = this.form.value;
    this.#classServer.addGymClass(formValue as IGymClass).subscribe(
      () => {
        this.#router.navigate(["/reservation/classes"]);
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
