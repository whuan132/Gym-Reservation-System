import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { ModalComponent } from "../common/modal.component";
import DateHelper from "../../utils/DateHelper";

@Component({
  selector: "app-class-add",
  template: `
    <app-modal
      modalId="class-add-modal"
      modalTitle="Add a new class"
      (onHide)="onHide()"
      (onShow)="onShow()"
    >
      <form class="space-y-6" [formGroup]="form" (ngSubmit)="onSubmit()">
        <div>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name"
            formControlName="name"
          />
        </div>
        <div>
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            formControlName="description"
          ></textarea>
        </div>
        <div>
          <input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="capacity"
            formControlName="capacity"
          />
        </div>
        <div>
          <input
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="startDate"
            formControlName="startDate"
          />
        </div>
        <div>
          <input
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="endDate"
            formControlName="endDate"
          />
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </app-modal>
  `,
  styles: [],
})
export class ClassAddComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() add = new EventEmitter<IGymClass>();

  form = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    capacity: [20, Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
  });

  #gymClassesService = inject(GymClassesService);

  onShow() {
    this.form.get("startDate")?.patchValue(DateHelper.formatDate(new Date()));
    this.form.get("endDate")?.patchValue(DateHelper.formatDate(new Date()));
  }

  onHide() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    const obj = {
      ...formValue,
      startDate: new Date(formValue.startDate as string),
      endDate: new Date(formValue.endDate as string),
    } as IGymClass;
    this.#gymClassesService.addGymClass(obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          obj._id = res.data;
          obj.rating = 5.0;
          this.add.emit(obj);
        }
        this.modal.hideModal();
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
