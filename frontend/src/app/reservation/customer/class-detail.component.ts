import { Component, inject, Input, OnInit } from "@angular/core";
import { IGymClass } from "../../types/gym-class.interface";
import { GymClassesService } from "../gym-classes.service";
import { IReview } from "../../types/review.interface";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";
import { ITrainer } from "../../types/trainer.interface";

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
          class="h-auto max-w-lg rounded-lg"
          [src]="IconHelper.getRandomPicture(clsData._id)"
          alt="image description"
        />

        <p
          class="mt-2 tracking-tighter text-gray-500 md:text-lg dark:text-gray-400"
        >
          {{ clsData.description }}
        </p>

        <time
          class="mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >{{ clsData.startDate | date }} - {{ clsData.endDate | date }}</time
        >

        <div class="space-y-2 mt-4">
          <div *ngFor="let trainer of trainers">
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  [src]="IconHelper.getRandomProfilePicture(trainer._id)"
                  alt="Neil image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <a [routerLink]="['', 'reservation', 'trainers', trainer._id]">
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
                <app-rating [rating]="trainer.rating" />
              </div>
            </div>
          </div>
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

  page: number = 1;
  pageSize: number = 10;
  reviews!: IPageData<IReview>;

  #gymClassesService = inject(GymClassesService);

  ngOnInit(): void {
    this.fetchClass();
    this.fetchTrainers();
    this.fetchReviews();
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

  protected readonly IconHelper = IconHelper;
}
