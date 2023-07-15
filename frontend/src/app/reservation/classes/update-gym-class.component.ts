import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-gym-class",
  template: `
    <div class="mt-20"></div>
    <h1>update-gym-class works!</h1>
    <form [formGroup]="form" (ngSubmit)="go()">
      <label> Name: <input placeholder="name" formControlName="name" /> </label>
      <label>
        Description:
        <input placeholder="description" formControlName="description" />
      </label>
      <label>
        Capacity:
        <input placeholder="capacity" formControlName="capacity" />
      </label>
      <label>
        Rating: <input placeholder="rating" formControlName="rating" />
      </label>
      <label>
        StartDate:
        <input
          type="date"
          placeholder="startDate"
          formControlName="startDate"
        />
      </label>
      <label>
        EndDate:
        <input type="date" placeholder="endDate" formControlName="endDate" />
      </label>
      <button type="submit">Update GymClass</button>
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
