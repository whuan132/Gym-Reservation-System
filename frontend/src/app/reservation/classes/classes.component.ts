import { Component, inject } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import IconHelper from "../../utils/IconHelper";
import { IPageData } from "../../types/page-data.interface";

@Component({
  selector: "app-classes",
  template: `
    <app-loading *ngIf="!gymClasses; else list" />

    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          Classes
        </h2>

        <div *ngIf="!gymClasses?.data?.length">
          <p>YOU HAVE NOT ANY RESERVATIONS.</p>
        </div>

        <div *ngIf="gymClasses?.data?.length">
          <app-page-selector
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />

          <div class="space-y-2 mt-4">
            <div *ngFor="let cls of gymClasses.data">
              <a
                href="#"
                class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  [src]="IconHelper.getRandomPicture(cls._id)"
                  alt=""
                />
                <div class="flex flex-col justify-between p-4 leading-normal">
                  <a [routerLink]="['', 'reservation', 'my', 'class', cls._id]">
                    <h5
                      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      {{ cls.name }}
                    </h5>
                  </a>

                  <app-rating [rating]="cls.rating" />

                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ cls.description }}
                  </p>
                  <p><b>StartDate:</b> {{ cls.startDate | date }}</p>
                  <p><b>EndDate:</b> {{ cls.endDate | date }}</p>

                  <a
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      class="w-3.5 h-3.5 ml-2"
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
                  </a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class ClassesComponent {
  #classServer = inject(GymClassesService);
  authService = inject(AuthService);
  #router = inject(Router);

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  gymClasses!: IPageData<IGymClass>;

  ngOnInit() {
    this.fetchGymClasss();
  }

  fetchGymClasss() {
    this.#classServer.getGymClasss(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data;
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteGymClass(id: string) {
    this.#classServer.deleteGymClass(id).subscribe(
      () => {
        this.fetchGymClasss();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  addGymClass() {
    this.#router.navigate(["/reservation/classes/add"]);
  }

  async goPage(page: number) {
    page = Math.min(Math.max(page, 1), this.totalPages);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchGymClasss();
  }

  protected readonly IconHelper = IconHelper;
}
