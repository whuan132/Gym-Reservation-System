import { Component, inject, Input, OnInit } from "@angular/core";
import { IGymClass } from "../../types/gym-class.interface";
import { GymClassesService } from "./gym-classes.service";
import { IReview } from "../../types/review.interface";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";
import { ITrainer } from "../../types/trainer.interface";
import { IReservation } from "../../types/reservation.interface";
import { AuthService } from "../../auth/auth.service";
import { MyReservationService } from "../customer/my-reservation.service";
import { ToastService } from "../../toast.service";

@Component({
  selector: "app-class-detail",
  template: `
    <app-loading *ngIf="!clsData; else detail" />

    <ng-template #detail>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          {{ clsData.name }}
          <span
            class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2"
          >
            #{{ clsData._id }}
          </span>
        </h2>

        <img
          class="mb-2 h-auto max-w-lg rounded-lg"
          [src]="IconHelper.getRandomPicture(clsData._id)"
          alt="image description"
        />

        <app-rating [rating]="clsData.rating" />

        <time
          class="mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >{{ clsData.startDate | date }} - {{ clsData.endDate | date }}</time
        >

        <p class="mb-2 text-gray-500 dark:text-gray-400 break-words">
          {{ clsData.description }}
        </p>

        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div class="flex flex-row items-center">
          <label
            for="trainers"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Trainers ({{ trainers?.length }})</label
          >
          <app-class-trainer-add
            *ngIf="authService.isAdmin"
            (chooseTrainer)="onAddTrainer($event)"
            [classTrainers]="trainers"
          />
          <app-class-trainer-remove
            *ngIf="authService.isAdmin"
            (chooseTrainer)="onRemoveTrainer($event)"
            [classTrainers]="trainers"
          />
        </div>
        <div id="trainers" class="flex mb-4 -space-x-4">
          <img
            *ngFor="let trainer of trainers"
            class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
            [src]="IconHelper.getRandomProfilePicture(trainer._id)"
            [alt]="trainer.name"
          />
        </div>

        <label
          for="reservations"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Customers ({{ reservations?.length }}/{{ clsData.capacity }})</label
        >
        <div id="reservations" class="flex mb-4 -space-x-4">
          <img
            *ngFor="let customer of reservations"
            class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
            [src]="IconHelper.getRandomProfilePicture(customer._id)"
            [alt]="customer.name"
          />
        </div>

        <div class="mt-4 flex items-center justify-start px-3 py-2">
          <button
            *ngIf="authService.isCustomer"
            (click)="onBooking()"
            [ngClass]="
              isBooked
                ? 'text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                : 'text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            "
            class="inline-flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                *ngIf="isBooked"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
              <path
                *ngIf="!isBooked"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            {{
              isBooked
                ? "Remove from my reservations"
                : "Add to my reservations"
            }}
          </button>
          <app-class-update
            *ngIf="authService.isAdmin"
            [cls]="clsData"
            (classUpdated)="onClassUpdated($event)"
          />
        </div>

        <app-review-editor (postComment)="onPostComment($event)" />
        <app-review-list [reviews]="reviews" (pageChanged)="goPage($event)" />
      </div>
    </ng-template>
  `,
  styles: [],
})
export class ClassDetailComponent implements OnInit {
  @Input() class_id!: string;
  clsData!: IGymClass;

  trainers!: ITrainer[];
  reservations!: IReservation[];

  page: number = 1;
  pageSize: number = 10;
  reviews!: IPageData<IReview>;

  authService = inject(AuthService);
  #gymClassesService = inject(GymClassesService);
  #myReservationService = inject(MyReservationService);
  #toastService = inject(ToastService);

  ngOnInit(): void {
    this.fetchClass();
    this.fetchTrainers();
    this.fetchReservations();
    this.fetchReviews();
  }

  get isBooked() {
    const myId = this.authService.user?._id;
    if (this.reservations && this.reservations.find((r) => r._id === myId)) {
      return true;
    }
    return false;
  }

  private fetchClass() {
    this.#gymClassesService.getGymClass(this.class_id).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.clsData = res.data;
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  private fetchTrainers() {
    this.#gymClassesService.getTrainers(this.class_id).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.trainers = res.data;
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  private fetchReviews() {
    this.#gymClassesService
      .getReviews(this.class_id, this.page, this.pageSize)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.success) {
            this.reviews = res.data;
            this.reviews.totalPage = Math.ceil(
              this.reviews.totalCount / this.pageSize,
            );
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }

  private fetchReservations() {
    this.#gymClassesService.getReservations(this.class_id).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.reservations = res.data.data;
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onAddTrainer(trainer: ITrainer) {
    this.#gymClassesService.addTrainer(this.class_id, trainer).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.fetchTrainers();
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onRemoveTrainer(trainer: ITrainer) {
    this.#gymClassesService.removeTrainer(this.class_id, trainer._id).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.fetchTrainers();
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onPostComment(review: IReview): void {
    this.#gymClassesService.addReview(this.class_id, review).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.fetchReviews();
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  async goPage(p: number) {
    let page = Math.min(Math.max(p, 1), this.reviews?.totalPage || 1);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchReviews();
  }

  onBooking() {
    if (this.isBooked) {
      this.#myReservationService
        .deleteReservationByGymClassId(this.class_id)
        .subscribe((res) => {
          console.log(res);
          if (res.success && res.data > 0) {
            const myId = this.authService.user?._id;
            this.reservations = this.reservations.filter((r) => r._id !== myId);
          }
        });
      return;
    }
    if (this.reservations?.length >= this.clsData?.capacity) {
      this.#toastService.showNotification("It's full.");
      return;
    }
    this.#gymClassesService.addReservation(this.class_id).subscribe((res) => {
      console.log(res);
      if (res.success && res.data > 0) {
        const user = this.authService.user;
        this.reservations.push(user as IReservation);
      }
    });
  }

  onClassUpdated(obj: any) {
    const original = this.clsData as any;
    for (const key in original) {
      if (obj[key] !== undefined && obj[key] !== original[key]) {
        original[key] = obj[key];
      }
    }
  }

  protected readonly IconHelper = IconHelper;
}
