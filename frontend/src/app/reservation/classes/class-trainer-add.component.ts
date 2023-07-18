import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ITrainer } from "../../types/trainer.interface";
import { Modal, ModalOptions } from "flowbite";
import { TrainerService } from "../trainer/trainer.service";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";

@Component({
  selector: "app-class-trainer-add",
  template: `
    <div class="flex items-center justify-between px-3 py-2">
      <button
        (click)="showModal()"
        data-modal-target="class-trainer-add-modal"
        type="button"
        aria-expanded="false"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-3 h-3 mr-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"
          />
        </svg>
        Add a trainer
      </button>
    </div>

    <div class="relative">
      <div>
        <!-- Main modal -->
        <div
          id="class-trainer-add-modal"
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
                  Add a trainer
                </h3>

                <app-loading *ngIf="!data; else list" />

                <ng-template #list>
                  <div
                    *ngFor="let trainer of data?.data"
                    class="divide-y divide-gray-100 dark:divide-gray-700"
                  >
                    <a
                      (click)="onChooseTrainer(trainer)"
                      class="flex space-x-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-8 h-8 rounded-full"
                          [src]="
                            IconHelper.getRandomProfilePicture(trainer._id)
                          "
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

                  <app-page-selector
                    [page]="page"
                    [totalPages]="totalPages"
                    (pageChanged)="goPage($event)"
                  />
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ClassTrainerAddComponent {
  @Input() classTrainers!: ITrainer[];
  @Output() chooseTrainer = new EventEmitter<ITrainer>();

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  data!: IPageData<ITrainer> | null;
  #trainerService = inject(TrainerService);
  #modal!: Modal;

  private fetchData() {
    this.#trainerService.getTrainers(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        if (res && res.success) {
          this.data = res.data;
          this.data.data = this.data.data.filter((d) => {
            if (this.classTrainers?.find((t) => t._id == d._id)) {
              return false;
            }
            return true;
          });
          this.page = res.data.page;
          this.totalPages = Math.ceil(this.data.totalCount / this.pageSize);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  async showModal() {
    const $modalElement = document.querySelector(
      "#class-trainer-add-modal",
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
    this.fetchData();
    this.#modal.show();
  }

  hideModal() {
    this.data = null;
    this.#modal && this.#modal.hide();
  }

  async goPage(page: number) {
    page = Math.min(Math.max(page, 1), this.totalPages);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchData();
  }

  onChooseTrainer(trainer: ITrainer): void {
    this.chooseTrainer.emit(trainer);
    this.hideModal();
  }

  protected readonly IconHelper = IconHelper;
}
