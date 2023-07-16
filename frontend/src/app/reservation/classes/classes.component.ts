import { Component, inject, OnInit } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../../types/gym-class.interface";
import { AuthService } from "../../auth/auth.service";
import { IPageData } from "../../types/page-data.interface";

@Component({
  selector: "app-classes",
  template: `
    <app-loading *ngIf="!gymClasses; else list" />
    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          Classes
        </h2>

        <app-class-add *ngIf="authService.isAdmin" (add)="onAddClass($event)" />

        <div *ngIf="!gymClasses?.data?.length">
          <p>THERE IS NOT ANY CLASS.</p>
        </div>

        <div *ngIf="gymClasses?.data?.length">
          <app-page-selector
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />

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
  #classService = inject(GymClassesService);
  authService = inject(AuthService);

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  gymClasses!: IPageData<IGymClass>;

  ngOnInit() {
    this.fetchGymClasss();
  }

  private fetchGymClasss() {
    this.#classService.getGymClasss(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data;
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
