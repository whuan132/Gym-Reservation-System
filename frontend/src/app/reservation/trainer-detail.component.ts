import { Component, inject, Input, OnInit } from "@angular/core";
import { ITrainer } from "../types/trainer.interface";
import { TrainerService } from "./trainer.service";
import { IReview } from "../types/review.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { IPageData } from "../types/page-data.interface";

@Component({
  selector: "app-trainer-detail",
  template: `
    <div class="mt-96" *ngIf="!trainer; else details">
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
              [src]="
                trainer.image ||
                'https://flowbite.com/docs/images/people/profile-picture-1.jpg'
              "
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

        <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="mt-4">
          <label
            for="rating"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your rating</label
          >
          <div id="rating" class="flex items-center mb-2">
            <svg
              *ngFor="let i of getRange(5)"
              [ngClass]="
                i <= ratingValue
                  ? 'w-4 h-4 text-yellow-300 mr-1'
                  : 'w-4 h-4 text-gray-300 mr-1 dark:text-gray-500'
              "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <a (click)="changeRating(i)">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </a>
            </svg>
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
            <article *ngFor="let review of reviews?.data">
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <div class="flex items-center mb-4 space-x-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
              <div class="flex items-center mb-1">
                <svg
                  *ngFor="let i of getRange(5)"
                  [ngClass]="
                    i <= review.rating
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
                  {{ review.rating }} out of 5
                </p>
              </div>

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

  getRange(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }

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
}
