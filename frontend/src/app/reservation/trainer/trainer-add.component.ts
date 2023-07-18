import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from "@angular/core";
import { TrainerService } from "./trainer.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ITrainer } from "../../types/trainer.interface";
import IconHelper from "../../utils/IconHelper";
import { ModalComponent } from "../common/modal.component";

@Component({
  selector: "app-trainer-add",
  template: `
    <app-modal
      modalId="trainer-add-modal"
      modalTitle="Add a new trainer"
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
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-modal-hide="trainer-add-modal"
        >
          Submit
        </button>
      </form>
    </app-modal>
  `,
  styles: [``],
})
export class TrainerAddComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() add = new EventEmitter<ITrainer>();

  form = inject(FormBuilder).group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    image: [IconHelper.getRandomProfilePicture(), Validators.required],
    specialization: ["", Validators.required],
  });

  #trainerService = inject(TrainerService);

  onShow() {
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
    this.#trainerService.addTrainer(obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          obj._id = res.data;
          obj.rating = 5.0;
          this.add.emit(obj);
        }
        this.modal.hideModal();
      },
      (err) => console.log(err),
    );
  }
}
