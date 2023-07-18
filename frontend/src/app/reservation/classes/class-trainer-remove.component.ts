import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { ITrainer } from "../../types/trainer.interface";
import IconHelper from "../../utils/IconHelper";
import { ModalComponent } from "../common/modal.component";

@Component({
  selector: "app-class-trainer-remove",
  template: `
    <app-modal
      modalId="class-trainer-remove-modal"
      modalTitle="Remove a trainer"
      (onHide)="onHide()"
      (onShow)="onShow()"
      buttonClass="inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
      <!-- Dropdown menu -->
      <div
        *ngFor="let trainer of classTrainers"
        class="divide-y divide-gray-100 dark:divide-gray-700"
      >
        <a
          (click)="onChooseTrainer(trainer)"
          class="flex space-x-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded-full"
              [src]="IconHelper.getRandomProfilePicture(trainer._id)"
              alt="Neil image"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              {{ trainer.name }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ trainer.email }}
            </p>
          </div>
        </a>
      </div>
    </app-modal>
  `,
  styles: [],
})
export class ClassTrainerRemoveComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Input() classTrainers!: ITrainer[];
  @Output() chooseTrainer = new EventEmitter<ITrainer>();

  onShow() {}
  onHide() {}

  onChooseTrainer(trainer: ITrainer): void {
    this.chooseTrainer.emit(trainer);
    this.modal.hideModal();
  }

  protected readonly IconHelper = IconHelper;
}
