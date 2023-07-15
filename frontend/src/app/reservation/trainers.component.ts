import { Component, inject, OnInit } from "@angular/core";
import { IPageData } from "../types/page-data.interface";
import { ITrainer } from "../types/trainer.interface";
import { TrainerService } from "./trainer.service";
import { getRandomProfilePicture } from "../utils/IconHelper";

@Component({
  selector: "app-trainers",
  template: `
    <div class="mt-96" *ngIf="!data; else list">
      <div
        role="status"
        class=" flex w-full h-full justify-center items-center"
      >
        <svg
          aria-hidden="true"
          class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          Trainers
        </h2>

        <div
          *ngIf="!data?.data?.length"
          class="my-36 text-xl text-gray-600 flex justify-center"
        >
          <p>DO NOT HAVE ANY TRAINERS NOW.</p>
        </div>

        <div *ngIf="data?.data?.length">
          <nav aria-label="Page navigation example" class="flex justify-end">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <a
                  style="cursor: pointer;"
                  class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  (click)="goPage(page - 1)"
                  >Prev</a
                >
              </li>
              <li *ngFor="let p of getRange(totalPages); index as i">
                <a
                  *ngIf="i + 1 !== page"
                  (click)="goPage(i + 1)"
                  style="cursor: pointer;"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >{{ i + 1 }}</a
                >
                <a
                  *ngIf="i + 1 === page"
                  (click)="goPage(i + 1)"
                  style="cursor: pointer;"
                  aria-current="page"
                  class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >{{ i + 1 }}</a
                >
              </li>
              <li>
                <a
                  style="cursor: pointer;"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  (click)="goPage(page + 1)"
                  >Next</a
                >
              </li>
            </ul>
          </nav>

          <div class="space-y-2 mt-4">
            <article *ngFor="let trainer of data.data">
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    [src]="trainer.image || getRandomProfilePicture()"
                    alt="Neil image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <a
                    [routerLink]="['', 'reservation', 'trainers', trainer._id]"
                  >
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ trainer.name }}
                    </p>
                  </a>
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    {{ trainer.email }}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ trainer.specialization }}
                  </p>

                  <div class="flex items-center">
                    <svg
                      *ngFor="let i of getRange(5)"
                      [ngClass]="
                        i <= trainer.rating
                          ? 'w-4 h-4 text-yellow-300 mr-1'
                          : 'w-4 h-4 text-gray-300 mr-1 dark:text-gray-500'
                      "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                      />
                    </svg>
                    <p
                      class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {{ trainer.rating }} out of 5
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <app-trainer-add (add)="onAddTrainer($event)" />
      </div>
    </ng-template>
  `,
  styles: [],
})
export class TrainersComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  data!: IPageData<ITrainer>;

  #trainerService = inject(TrainerService);

  getRange(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }

  async ngOnInit() {
    await this.fetchData();
  }

  private async fetchData() {
    this.#trainerService.getTrainers(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        if (res && res.success) {
          this.data = res.data;
          this.page = res.data.page;
          this.totalPages = Math.ceil(this.data.totalCount / this.pageSize);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  async goPage(page: number) {
    page = Math.min(Math.max(page, 1), this.totalPages);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchData();
  }

  async onAddTrainer(obj: ITrainer) {
    this.data.data.push(obj);
    await this.fetchData();
  }

  protected readonly getRandomProfilePicture = getRandomProfilePicture;
}
