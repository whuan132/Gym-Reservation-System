import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Modal, ModalOptions } from "flowbite";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { IUser } from "../../types/user.interface";

@Component({
  selector: "app-user-update",
  template: `
    <div>
      <button
        (click)="showModal()"
        data-modal-target="member-modal"
        type="button"
        aria-expanded="false"
        class="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update user
      </button>
    </div>

    <div class="relative">
      <div>
        <!-- Main modal -->
        <div
          id="member-modal"
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
                  Update User
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
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="email"
                      formControlName="email"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="role"
                      formControlName="role"
                    />
                  </div>
                  <div class="flex items-center space-x-4">
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      data-modal-hide="member-modal"
                    >
                      Update user
                    </button>
                    <button
                      (click)="deleteUser()"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UserUpdateComponent {
  @Input({ required: true }) cls!: IUser;
  @Output() userUpdated = new EventEmitter<IUser>();

  form = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    role: ["", Validators.required],
  });

  #userService = inject(UserService);
  #router = inject(Router);
  #modal!: Modal;

  private formatDate(date: Date): string {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  showModal() {
    const $modalElement = document.querySelector(
      "#member-modal",
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
    if (this.cls) {
      this.form.get("name")?.patchValue(this.cls.name);
      this.form.get("email")?.patchValue(this.cls.email);
      this.form.get("role")?.patchValue(this.cls.role);
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
    const formValue = this.form.value;
    const obj = {
      ...formValue,
    } as IUser;
    this.#userService.updateUserById(this.cls._id, obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.userUpdated.emit(obj);
        }
        this.hideModal();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteUser() {
    this.#userService.deleteUserById(this.cls._id).subscribe(
      async (res) => {
        if (res.success) {
          this.hideModal();
          await this.#router.navigate(["", "reservation", "users"]);
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }
}
