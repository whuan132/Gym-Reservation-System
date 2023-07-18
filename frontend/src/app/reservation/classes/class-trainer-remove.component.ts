import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITrainer } from "../../types/trainer.interface";
import { Modal, ModalOptions } from "flowbite";
import IconHelper from "../../utils/IconHelper";

@Component({
  selector: "app-class-trainer-remove",
  template: `
    <div class="flex items-center justify-between px-3 py-2">
      <button
        (click)="showModal()"
        [disabled]="!classTrainers?.length"
        data-modal-target="class-trainer-remove-modal"
        type="button"
        class="inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
        Remove a trainer
      </button>
    </div>

    <div class="relative">
      <div>
        <!-- Main modal -->
        <div
          id="class-trainer-remove-modal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                (click)="hideModal()"
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                id="close-icon"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>

              <div class="px-6 py-6 lg:px-8">
                <h3
                  class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Remove a trainer
                </h3>

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
                      <p
                        class="text-sm text-gray-500 truncate dark:text-gray-400"
                      >
                        {{ trainer.email }}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ClassTrainerRemoveComponent {
  @Input() classTrainers!: ITrainer[];
  @Output() chooseTrainer = new EventEmitter<ITrainer>();

  #modal!: Modal;

  async showModal() {
    const $modalElement = document.querySelector(
      "#class-trainer-remove-modal",
    ) as HTMLElement;

    if (!this.#modal) {
      const modalOptions = {
        placement: "center",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        onHide: () => {
          console.log("modal is hidden");
        },
        onShow: () => {
          console.log("modal is shown");
        },
        onToggle: () => {
          console.log("modal has been toggled");
        },
      };

      this.#modal = new Modal($modalElement, modalOptions as ModalOptions);
      this.#modal._init();
    }
    this.#modal.show();
  }

  hideModal() {
    this.#modal && this.#modal.hide();
  }

  onChooseTrainer(trainer: ITrainer): void {
    this.chooseTrainer.emit(trainer);
    this.hideModal();
  }

  protected readonly IconHelper = IconHelper;
}
