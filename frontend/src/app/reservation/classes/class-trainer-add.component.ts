import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { ITrainer } from "../../types/trainer.interface";
import { TrainerService } from "../trainer/trainer.service";
import { IPageData } from "../../types/page-data.interface";
import IconHelper from "../../utils/IconHelper";
import { ModalComponent } from "../common/modal.component";

@Component({
  selector: "app-class-trainer-add",
  template: `
    <app-modal
      modalId="class-trainer-add-modal"
      modalTitle="Add a trainer"
      (onHide)="onHide()"
      (onShow)="onShow()"
    >
      <app-loading *ngIf="!data; else list" />

      <ng-template #list>
        <div
          *ngFor="let trainer of data?.data"
          class="divide-y divide-gray-100 dark:divide-gray-700"
        >
          <a
            (click)="onChooseTrainer(trainer)"
            class="flex space-x-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
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
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {{ trainer.email }}
              </p>
            </div>
          </a>
        </div>

        <app-page-selector
          [page]="page"
          [totalPages]="totalPages"
          (pageChanged)="goPage($event)"
        />
      </ng-template>
    </app-modal>
  `,
  styles: [],
})
export class ClassTrainerAddComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Input() classTrainers!: ITrainer[];
  @Output() chooseTrainer = new EventEmitter<ITrainer>();

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  data!: IPageData<ITrainer> | null;
  #trainerService = inject(TrainerService);

  private fetchData() {
    this.#trainerService.getTrainers(this.page, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        if (res && res.success) {
          this.data = res.data;
          this.data.data = this.data.data.filter((d) => {
            if (this.classTrainers?.find((t) => t._id == d._id)) {
              return false;
            }
            return true;
          });
          this.page = res.data.page;
          this.totalPages = Math.ceil(this.data.totalCount / this.pageSize);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onShow() {
    this.fetchData();
  }

  onHide() {
    this.data = null;
  }

  async goPage(page: number) {
    page = Math.min(Math.max(page, 1), this.totalPages);
    if (page === this.page) {
      return;
    }
    this.page = page;
    await this.fetchData();
  }

  onChooseTrainer(trainer: ITrainer): void {
    this.chooseTrainer.emit(trainer);
    this.modal.hideModal();
  }

  protected readonly IconHelper = IconHelper;
}
