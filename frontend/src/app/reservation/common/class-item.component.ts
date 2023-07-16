import { Component, Input } from "@angular/core";
import IconHelper from "../../utils/IconHelper";
import { IGymClass } from "../../types/gym-class.interface";

@Component({
  selector: "app-class-item",
  template: `
    <a
      [routerLink]="['', 'reservation', 'classes', cls._id]"
      class="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        [src]="IconHelper.getRandomPicture(cls._id)"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ cls.name }}
          <time
            class="text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >
            {{ cls.startDate | date }} - {{ cls.endDate | date }}
          </time>
        </h5>

        <app-rating [rating]="cls.rating" />

        <p
          class="mb-2 mt-2 font-normal text-gray-500 dark:text-gray-400 break-words"
        >
          {{
            cls.description.length > 48
              ? cls.description.substring(0, 48) + "..."
              : cls.description
          }}
        </p>
      </div>
    </a>
  `,
  styles: [],
})
export class ClassItemComponent {
  @Input({ required: true }) cls!: IGymClass;

  protected readonly IconHelper = IconHelper;
}
