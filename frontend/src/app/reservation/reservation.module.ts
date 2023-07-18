import { NgModule } from "@angular/core";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  TitleCasePipe,
} from "@angular/common";
import { ClassesComponent } from "./classes/classes.component";
import { MyReservationComponent } from "./customer/my-reservation.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GymClassesService } from "./classes/gym-classes.service";
import { TrainersComponent } from "./trainer/trainers.component";
import { TrainerAddComponent } from "./trainer/trainer-add.component";
import { TrainerDetailComponent } from "./trainer/trainer-detail.component";
import { RatingComponent } from "./common/rating.component";
import { PageSelectorComponent } from "./common/page-selector.component";
import { LoadingComponent } from "./common/loading.component";
import { ReviewEditorComponent } from "./common/review-editor.component";
import { ReviewListComponent } from "./common/review-list.component";
import { ClassDetailComponent } from "./classes/class-detail.component";
import { ClassAddComponent } from "./classes/class-add.component";
import { ClassItemComponent } from "./common/class-item.component";
import { ClassUpdateComponent } from "./classes/class-update.component";
import { UserComponent } from "./users/user.component";
import { UserDetailComponent } from "./users/user-detail.component";
import { UserUpdateComponent } from "./users/user-update.component";
import { ClassTrainerAddComponent } from "./classes/class-trainer-add.component";
import { ClassTrainerRemoveComponent } from "./classes/class-trainer-remove.component";
import { ModalComponent } from "./common/modal.component";
import { TrainerUpdateComponent } from './trainer/trainer-update.component';

const MY_ROUTES: Routes = [
  { path: "", redirectTo: "classes", pathMatch: "full" },
  { path: "classes", component: ClassesComponent, title: "Classes" },
  {
    path: "classes/:class_id",
    component: ClassDetailComponent,
    title: "Class Detail",
  },
  { path: "trainers", component: TrainersComponent, title: "Trainers" },
  {
    path: "trainers/:trainer_id",
    component: TrainerDetailComponent,
    title: "Trainer Detail",
  },
  {
    path: "my",
    component: MyReservationComponent,
    title: "My Reservations",
  },
  { path: "users", component: UserComponent, title: "Users" },
  {
    path: "users/:user_id",
    component: UserDetailComponent,
    title: "User Detail",
  },
];

@NgModule({
  declarations: [
    ClassesComponent,
    MyReservationComponent,
    TrainersComponent,
    TrainerAddComponent,
    TrainerDetailComponent,
    RatingComponent,
    PageSelectorComponent,
    LoadingComponent,
    ReviewEditorComponent,
    ReviewListComponent,
    ClassDetailComponent,
    ClassAddComponent,
    ClassItemComponent,
    ClassUpdateComponent,
    ClassTrainerAddComponent,
    ClassTrainerRemoveComponent,
    ModalComponent,
    UserComponent,
    UserDetailComponent,
    UserUpdateComponent,
    TrainerUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(MY_ROUTES),
    NgForOf,
    TitleCasePipe,
    FormsModule,
    NgForOf,
    NgIf,
    TitleCasePipe,
    NgForOf,
    NgOptimizedImage,
  ],
  providers: [GymClassesService],
  exports: [RouterModule],
})
export class ReservationModule {}
