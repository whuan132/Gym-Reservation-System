import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-gym-class",
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
        Update Class
      </button>
    </form>
  `,
  styles: [],
})
export class UpdateGymClassComponent implements OnInit {
  @Input() class_id = "";
  #router = inject(Router);

  #classService = inject(GymClassesService);

  form = inject(FormBuilder).nonNullable.group({
    _id: "",
    name: ["", Validators.required],
    description: ["", Validators.required],
    capacity: [1, Validators.required],
    rating: [0, Validators.required],
    startDate: [this.formatDate(new Date()), Validators.required],
    endDate: [this.formatDate(new Date()), Validators.required],
  });

  formatDate(date: Date): string {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  ngOnInit() {
    this.#classService.getGymClass(this.class_id).subscribe((res) => {
      if (res.success) {
        this.form.get("_id")?.patchValue(res.data._id);
        this.form.get("name")?.patchValue(res.data.name);
        this.form.get("description")?.patchValue(res.data.description);
        this.form.get("capacity")?.patchValue(res.data.capacity);
        this.form.get("rating")?.patchValue(res.data.rating);
        this.form
          .get("startDate")
          ?.patchValue(this.formatDate(new Date(res.data.startDate)));
        this.form
          .get("endDate")
          ?.patchValue(this.formatDate(new Date(res.data.endDate)));
      }
    });
  }

  go() {
    const formValue = this.form.value;
    const obj = {
      ...formValue,
      startDate: new Date(formValue.startDate as string),
      endDate: new Date(formValue.endDate as string),
    } as IGymClass;
    this.#classService.updateGymClass(this.class_id, obj).subscribe((res) => {
      if (res.success) {
        this.#router.navigate(["", "reservation", "classes"]);
      }
    });
  }
}
