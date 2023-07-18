import { Component, inject, OnInit } from "@angular/core";
import { IPageData } from "../../types/page-data.interface";
import { UserService } from "./user.service";
import IconHelper from "../../utils/IconHelper";
import { AuthService } from "../../auth/auth.service";
import { IUser } from "../../types/user.interface";

@Component({
  selector: "app-users",
  template: `
    <div class="mt-96" *ngIf="!data; else list">
      <app-loading />
    </div>

    <ng-template #list>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          Users
        </h2>
        <div
          *ngIf="!data?.data?.length"
          class="my-36 text-xl text-gray-600 flex justify-center"
        >
          <p>DO NOT HAVE ANY TRAINERS NOW.</p>
        </div>

        <div *ngIf="data?.data?.length">
          <app-page-selector
            [page]="page"
            [totalPages]="totalPages"
            (pageChanged)="goPage($event)"
          />

          <div class="space-y-2 mt-4">
            <article *ngFor="let user of data.data">
              <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              <a [routerLink]="['', 'reservation', 'users', user._id]">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 rounded-full"
                      [src]="IconHelper.getRandomProfilePicture(user._id)"
                      alt="Neil image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ user.name }}
                    </p>

                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-white"
                    >
                      {{ user.email }}
                    </p>
                    <p
                      class="text-sm text-gray-500 truncate dark:text-gray-400"
                    >
                      {{ user.role }}
                    </p>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  data!: IPageData<IUser>;

  authService = inject(AuthService);
  #userService = inject(UserService);

  async ngOnInit() {
    await this.fetchData();
  }

  private async fetchData() {
    this.#userService.getUsers(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        if (res && res.success) {
          this.data = res.data;
          this.page = res.data.page;
          this.totalPages = Math.ceil(this.data.totalCount / this.pageSize);
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
    await this.fetchData();
  }

  protected readonly IconHelper = IconHelper;
}
