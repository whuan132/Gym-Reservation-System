import { Component, inject, OnInit } from "@angular/core";
import { MyReservationService } from "./my-reservation.service";
import { IGymClass } from "../../types/gym-class.interface";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";

@Component({
  selector: "app-my-reservation",
  template: `
    <app-loading *ngIf="!gymClasses; else list" />

    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          My Reservations
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
                [routerLink]="['', 'reservation', 'my', 'class', cls._id]"
                class="flex flex-col items-center bg-white border border-gray-200
              rounded-lg shadow md:flex-row hover:bg-gray-100
              dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  [src]="IconHelper.getRandomPicture(cls._id)"
                  alt=""
                />
                <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ cls.name }}
                  </h5>

                  <app-rating [rating]="cls.rating" />

                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ cls.description }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [``],
})
export class MyReservationComponent implements OnInit {
  #myReServer = inject(MyReservationService);

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  gymClasses!: IPageData<IGymClass>;

  ngOnInit() {
    this.fetchMyReservations();
  }

  private fetchMyReservations() {
    this.#myReServer.getReservations(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data;
        this.totalPages = Math.ceil(this.gymClasses.totalCount / this.pageSize);
      },
      (error) => {
        console.error(error);
      },
    );
  }

  async goPage(page: number) {
    page = Math.min(Math.max(page, 1), this.totalPages);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchMyReservations();
  }

  protected readonly IconHelper = IconHelper;
}
