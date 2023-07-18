import { Component, inject, Input, OnInit } from "@angular/core";
import { ITrainer } from "../../types/trainer.interface";
import { TrainerService } from "./trainer.service";
import { IReview } from "../../types/review.interface";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";
import { AuthService } from "../../auth/auth.service";

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

        <div *ngIf="authService.isAdmin" class="mt-4">
          <app-trainer-update
            [trainer]="trainer"
            (trainerUpdated)="onTrainerUpdated($event)"
          />
        </div>

        <app-review-editor (postComment)="onPostComment($event)" />
        <app-review-list [reviews]="reviews" (pageChanged)="goPage($event)" />
      </div>
    </ng-template>
  `,
  styles: [],
})
export class TrainerDetailComponent implements OnInit {
  @Input() trainer_id!: string;

  page: number = 1;
  pageSize: number = 10;
  trainer!: ITrainer;
  reviews!: IPageData<IReview>;

  authService = inject(AuthService);
  #trainerService = inject(TrainerService);

  ngOnInit(): void {
    this.fetchTrainer();
    this.fetchReviews();
  }

  private fetchTrainer(): void {
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
  }

  private fetchReviews() {
    this.#trainerService
      .getReviews(this.trainer_id, this.page, this.pageSize)
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

  onPostComment(obj: IReview) {
    this.#trainerService.addReview(this.trainer_id, obj).subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.fetchTrainer();
          this.fetchReviews();
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onTrainerUpdated(obj: any) {
    const original = this.trainer as any;
    for (const key in original) {
      if (obj[key] !== undefined && obj[key] !== original[key]) {
        original[key] = obj[key];
      }
    }
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
