import { Component, inject, OnInit } from "@angular/core";
import { MyReservationService } from "./my-reservation.service";
import { IGymClass } from "../../types/gym-class.interface";
import { IPageData } from "../../types/page-data.interface";

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
          <p>YOU DO NOT HAVE ANY RESERVATIONS.</p>
        </div>

        <div *ngIf="gymClasses?.data?.length">
          <app-page-selector
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />
          <div class="space-y-2 mt-4">
            <div *ngFor="let cls of gymClasses.data">
              <app-class-item [cls]="cls" />
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
}
