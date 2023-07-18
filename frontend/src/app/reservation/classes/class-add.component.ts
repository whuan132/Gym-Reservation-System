import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Modal, ModalOptions } from "flowbite";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";

@Component({
  selector: "app-class-add",
  template: `
    <div
      class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 -mb-12"
    >
      <button
        (click)="showModal()"
        data-modal-target="class-add-modal"
        type="button"
        aria-expanded="false"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        Add a new class
      </button>
    </div>

    <div class="relative">
      <div>
        <!-- Main modal -->
        <div
          id="class-add-modal"
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
                  Add a new class
                </h3>
                <form
                  class="space-y-6"
                  [formGroup]="form"
                  (ngSubmit)="onSubmit()"
                >
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
                    data-modal-hide="class-add-modal"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ClassAddComponent {
  @Output() add = new EventEmitter<IGymClass>();

  form = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    capacity: [20, Validators.required],
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
  });

  #classServer = inject(GymClassesService);
  #modal!: Modal;

  showModal() {
    const $modalElement = document.querySelector(
      "#class-add-modal",
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
    this.form.reset();
    this.#modal && this.#modal.hide();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const obj = this.form.value as IGymClass;
    this.#classServer.addGymClass(obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          obj._id = res.data;
          obj.rating = 5.0;
          this.add.emit(obj);
        }
        this.hideModal();
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
