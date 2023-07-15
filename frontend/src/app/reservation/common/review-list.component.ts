import { Component, EventEmitter, Input, Output } from "@angular/core";
import IconHelper from "../../utils/IconHelper";
import { IPageData } from "../../types/page-data.interface";
import { IReview } from "../../types/review.interface";

@Component({
  selector: "app-review-list",
  template: `
    <div
      *ngIf="!reviews?.data?.length; else list"
      class="my-36 text-xl text-gray-600 flex justify-center"
    >
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <p>DO NOT HAVE ANY REVIEW NOW.</p>
    </div>

    <ng-template #list>
      <div>
        <app-page-selector
          [page]="reviews.page"
          [totalPages]="reviews.totalPage"
          (pageChanged)="goPage($event)"
        />

        <div class="space-y-2 mt-4">
          <article *ngFor="let review of reviews?.data">
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex items-center mb-4 space-x-4">
              <img
                class="w-10 h-10 rounded-full"
                [src]="IconHelper.getRandomProfilePicture(review.createdBy.id)"
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
    </ng-template>
  `,
  styles: [],
})
export class ReviewListComponent {
  @Input({ required: true }) reviews!: IPageData<IReview>;
  @Output() pageChanged = new EventEmitter<number>();

  goPage(p: number) {
    this.pageChanged.emit(p);
  }

  protected readonly IconHelper = IconHelper;
}
