import { Component, inject, Input, OnInit } from "@angular/core";
import { ITrainer } from "../types/trainer.interface";
import { TrainerService } from "./trainer.service";
import { IReview } from "../types/review.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { IPageData } from "../types/page-data.interface";
import IconHelper from "../utils/IconHelper";

@Component({
  selector: "app-trainer-detail",
  template: `
    <div class="mt-96" *ngIf="!trainer; else details">
      <app-loading />
    </div>

    <ng-template #details>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          {{ trainer.name }}
          <span
            class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2"
          >
            #{{ trainer._id }}
          </span>
        </h2>

        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded-full"
              [src]="IconHelper.getRandomProfilePicture(trainer._id)"
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
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              {{ trainer.email }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ trainer.specialization }}
            </p>

            <app-rating [rating]="trainer.rating" />
          </div>
        </div>

        <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="mt-4">
          <label
            for="rating"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your rating</label
          >
          <div class="mb-2">
            <app-rating
              [rating]="ratingValue"
              (ratingChanged)="changeRating($event)"
            />
          </div>

          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your comment</label
          >
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
            formControlName="comment"
          ></textarea>

          <div
            class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600"
          >
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
          </div>
        </form>

        <div
          *ngIf="!reviews?.data?.length"
          class="my-36 text-xl text-gray-600 flex justify-center"
        >
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <p>DO NOT HAVE ANY REVIEW NOW.</p>
        </div>

        <div *ngIf="reviews?.data?.length">
          <app-page-selector
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />

          <div class="space-y-2 mt-4">
            <article *ngFor="let review of reviews?.data">
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <div class="flex items-center mb-4 space-x-4">
                <img
                  class="w-10 h-10 rounded-full"
                  [src]="
                    IconHelper.getRandomProfilePicture(review.createdBy.id)
                  "
                  alt=""
                />
                <div class="space-y-1 font-medium dark:text-white">
                  <p>
                    {{ review.createdBy.name
                    }}<span
                      class="block text-sm text-gray-500 dark:text-gray-400"
                      >{{ review.createdBy.email }}</span
                    >
                  </p>
                </div>
              </div>
              <app-rating [rating]="review.rating" />

              <p class="mb-2 text-gray-500 dark:text-gray-400">
                {{ review.comment }}
              </p>

              <aside>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Created at {{ review.createdAt | date }}
                </p>
              </aside>
            </article>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class TrainerDetailComponent implements OnInit {
  @Input() trainer_id!: string;

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  trainer!: ITrainer;
  reviews!: IPageData<IReview>;

  #trainerService = inject(TrainerService);

  ngOnInit(): void {
    this.#trainerService.getTrainerById(this.trainer_id).subscribe(
      (res) => {
        if (res && res.success) {
          this.trainer = res.data;
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.fetchReviews();
  }

  private fetchReviews() {
    this.#trainerService
      .getReviews(this.trainer_id, this.page, this.pageSize)
      .subscribe(
        (res) => {
          console.log(res);
          if (res.success) {
            this.reviews = res.data;
            this.page = res.data.page;
            this.totalPages = Math.ceil(
              this.reviews.totalCount / this.pageSize,
            );
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }

  reviewForm = inject(FormBuilder).group({
    rating: [3, Validators.required],
    comment: ["", [Validators.required, Validators.maxLength(256)]],
  });

  get ratingValue() {
    return this.reviewForm.controls["rating"]?.value || 1;
  }

  changeRating(newRating: number) {
    this.reviewForm.controls["rating"]?.patchValue(newRating);
  }
  onSubmit() {
    if (this.reviewForm.invalid) {
      return;
    }
    const obj = this.reviewForm.value as IReview;
    this.#trainerService.addReview(this.trainer_id, obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.reviewForm.reset();
          this.fetchReviews();
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
    await this.fetchReviews();
  }

  protected readonly IconHelper = IconHelper;
}
