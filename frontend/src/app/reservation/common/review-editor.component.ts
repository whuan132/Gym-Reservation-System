import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IReview } from "../../types/review.interface";

@Component({
  selector: "app-review-editor",
  template: `
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
          [disabled]="reviewForm.invalid"
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Post comment
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class ReviewEditorComponent {
  @Output() postComment = new EventEmitter<IReview>();

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
    this.postComment.emit(obj);
    this.reviewForm.reset({ rating: 3, comment: "" });
  }
}
