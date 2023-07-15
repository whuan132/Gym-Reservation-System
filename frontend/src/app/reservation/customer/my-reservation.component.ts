import { Component, inject } from "@angular/core";
import { MyReservationService } from "./my-reservation.service";
import { Router } from "@angular/router";
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
            </div>
          </a>
        </div>
      </div>
    </ng-template>

    <!--    <div class="center-div">-->
    <!--      &lt;!&ndash;      <h3>Reservation List</h3>&ndash;&gt;-->
    <!--      <div *ngIf="gymClasses">-->
    <!--        <ul>-->
    <!--          <li *ngFor="let cls of gymClasses">-->
    <!--            {{ cls.name | titlecase }}-->
    <!--            <button-->
    <!--              (click)="deleteReservationByGymClassId(cls._id)"-->
    <!--              style="padding-right: 10px;"-->
    <!--            >-->
    <!--              Delete-->
    <!--            </button>-->
    <!--            <button (click)="updateReservation(cls._id)">Update</button>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--        <br />-->
    <!--        <button (click)="addReservation()">Add Reservation</button>-->
    <!--      </div>-->

    <!--      <ng-template #loader><h1>Loading...</h1></ng-template>-->
    <!--    </div>-->
  `,
  styles: [``],
})
export class MyReservationComponent {
  #myReServer = inject(MyReservationService);
  #router = inject(Router);

  page: number = 1;
  pageSize: number = 10;
  gymClasses!: IPageData<IGymClass>;

  ngOnInit() {
    this.fetchMyReservations();
  }

  fetchMyReservations() {
    this.#myReServer.getReservations(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data;
        // console.log("gymClasses: " + JSON.stringify(this.gymClasses.at(0)));
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteReservationByGymClassId(gymClass_id: string) {
    this.#myReServer.deleteReservationByGymClassId(gymClass_id).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      },
    );
  }
  updateReservation(res_id: string) {}
  addReservation() {}

  protected readonly IconHelper = IconHelper;
}
