import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-page-selector",
  template: `
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
  `,
  styles: [],
})
export class PageSelectorComponent {
  @Input({ required: true }) page = 1;
  @Input({ required: true }) totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  getRange(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }

  goPage(page: number): void {
    this.pageChanged.emit(page);
  }
}
