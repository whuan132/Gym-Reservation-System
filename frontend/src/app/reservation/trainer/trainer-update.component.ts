import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { ModalComponent } from "../common/modal.component";
import { ITrainer } from "../../types/trainer.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { TrainerService } from "./trainer.service";
import IconHelper from "../../utils/IconHelper";
import { Router } from "@angular/router";

@Component({
  selector: "app-trainer-update",
  template: `
    <app-modal
      modalId="trainer-update-modal"
      modalTitle="Update trainer"
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
          <input
            type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            formControlName="email"
          />
        </div>
        <div>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="image"
            formControlName="image"
          />
        </div>
        <div>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="specialization"
            formControlName="specialization"
          />
        </div>
        <div class="flex items-center space-x-4">
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-modal-hide="class-update-modal"
          >
            Update trainer
          </button>
          <button
            (click)="deleteTrainerByClassId()"
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
  styles: [``],
})
export class TrainerUpdateComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() trainerUpdated = new EventEmitter<ITrainer>();

  @Input({ required: true }) trainer!: ITrainer;

  form = inject(FormBuilder).group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    image: [IconHelper.getRandomProfilePicture(), Validators.required],
    specialization: ["", Validators.required],
  });

  #trainerService = inject(TrainerService);
  #router = inject(Router);

  onShow() {
    this.form.get("name")?.patchValue(this.trainer.name);
    this.form.get("email")?.patchValue(this.trainer.email);
    this.form.get("specialization")?.patchValue(this.trainer.specialization);
    this.form.controls["image"]?.patchValue(
      IconHelper.getRandomProfilePicture(),
    );
  }

  onHide() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const obj = this.form.value as ITrainer;
    this.#trainerService.updateTrainerById(this.trainer._id, obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success && res.data > 0) {
          this.trainerUpdated.emit(obj);
        }
        this.modal.hideModal();
      },
      (err) => console.log(err),
    );
  }

  deleteTrainerByClassId() {
    this.#trainerService.deleteTrainerById(this.trainer._id).subscribe(
      async (res) => {
        console.log(res);
        if (res.success && res.data > 0) {
          this.modal.hideModal();
          await this.#router.navigate(["", "reservation", "trainers"]);
        }
        this.modal.hideModal();
      },
      (err) => console.log(err),
    );
  }
}
