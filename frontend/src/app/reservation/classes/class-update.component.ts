import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { IGymClass } from "../../types/gym-class.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { Router } from "@angular/router";
import { ModalComponent } from "../common/modal.component";
import DateHelper from "../../utils/DateHelper";

@Component({
  selector: "app-class-update",
  template: `
    <app-modal
      modalId="class-update-modal"
      modalTitle="Update class"
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
        <div class="flex items-center space-x-4">
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-modal-hide="class-update-modal"
          >
            Update class
          </button>
          <button
            (click)="deleteGymClass()"
            type="button"
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              class="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Delete
          </button>
        </div>
      </form>
    </app-modal>
  `,
  styles: [],
})
export class ClassUpdateComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Input({ required: true }) cls!: IGymClass;
  @Output() classUpdated = new EventEmitter<IGymClass>();

  form = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    capacity: [20, Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
  });

  #gymClassesService = inject(GymClassesService);
  #router = inject(Router);

  protected onShow() {
    this.form.get("name")?.patchValue(this.cls.name);
    this.form.get("description")?.patchValue(this.cls.description);
    this.form.get("capacity")?.patchValue(this.cls.capacity);
    this.form
      .get("startDate")
      ?.patchValue(DateHelper.formatDate(new Date(this.cls.startDate)));
    this.form
      .get("endDate")
      ?.patchValue(DateHelper.formatDate(new Date(this.cls.endDate)));
  }

  protected onHide() {
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
    this.#gymClassesService.updateGymClass(this.cls._id, obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.classUpdated.emit(obj);
        }
        this.modal.hideModal();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteGymClass() {
    this.#gymClassesService.deleteGymClass(this.cls._id).subscribe(
      async (res) => {
        if (res.success) {
          this.modal.hideModal();
          await this.#router.navigate(["", "reservation", "classes"]);
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }
}
