import { Component, inject, Input, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { IReview } from "../../types/review.interface";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";
import { IUser } from "../../types/user.interface";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-user-detail",
  template: `
    <div class="mt-96" *ngIf="!user; else details">
      <app-loading />
    </div>

    <ng-template #details>
      <div class="mt-20 mx-auto w-full items-start md:max-w-2xl">
        <h2
          class="mb-4 flex items-center text-5xl font-extrabold dark:text-white"
        >
          {{ user.name }}
          <span
            class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2"
          >
            #{{ user._id }}
          </span>
        </h2>

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
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ user.role }}
            </p>
          </div>
        </div>
        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <app-user-update
          *ngIf="authService.isAdmin"
          [cls]="user"
          (userUpdated)="onUserUpdated($event)"
        />
      </div>
    </ng-template>
  `,
  styles: [],
})
export class UserDetailComponent implements OnInit {
  @Input() user_id!: string;

  page: number = 1;
  pageSize: number = 10;
  user!: IUser;
  reviews!: IPageData<IReview>;

  #userService = inject(UserService);
  authService = inject(AuthService);
  ngOnInit(): void {
    this.#userService.getUserById(this.user_id).subscribe(
      (res) => {
        if (res && res.success) {
          this.user = res.data;
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onUserUpdated(obj: any) {
    const original = this.user as any;
    for (const key in original) {
      if (obj[key] !== undefined && obj[key] !== original[key]) {
        original[key] = obj[key];
      }
    }
  }

  protected readonly IconHelper = IconHelper;
}
