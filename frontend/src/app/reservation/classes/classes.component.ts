import { Component, inject, OnInit } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { AuthService } from "../../auth/auth.service";
import { IPageData } from "../../types/page-data.interface";

@Component({
  selector: "app-classes",
  template: `
    <div class="mt-96" *ngIf="!gymClasses; else list">
      <app-loading />
    </div>
    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          Classes
        </h2>

        <div class="flex flex-row items-center justify-between space-y-2">
          <div>
            <app-class-add
              *ngIf="authService.isAdmin"
              (add)="onAddClass($event)"
            />
          </div>
          <app-page-selector
            *ngIf="gymClasses?.data?.length"
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />
        </div>

        <div
          *ngIf="!gymClasses?.data?.length"
          class="my-36 text-xl text-gray-600 flex justify-center"
        >
          <p>THERE IS NOT ANY CLASS.</p>
        </div>

        <div *ngIf="gymClasses?.data?.length">
          <div class="space-y-2 mt-4">
            <div *ngFor="let cls of gymClasses.data">
              <app-class-item [cls]="cls" />
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class ClassesComponent implements OnInit {
  #gymClassesService = inject(GymClassesService);
  authService = inject(AuthService);

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  gymClasses!: IPageData<IGymClass>;

  ngOnInit() {
    this.fetchGymClasss();
  }

  private fetchGymClasss() {
    this.#gymClassesService.getGymClasss(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data;
        this.page = res.data.page;
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
    await this.fetchGymClasss();
  }

  async onAddClass(obj: IGymClass) {
    this.gymClasses.data.push(obj);
    await this.fetchGymClasss();
  }
}
