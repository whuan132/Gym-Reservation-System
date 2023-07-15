import { NgModule } from "@angular/core";
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  TitleCasePipe,
} from "@angular/common";
import { ClassesComponent } from "./classes.component";
import { MyReservationComponent } from "./my-reservation.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { TrainersComponent } from "./trainer/trainers.component";
import { AddGymClassComponent } from "./add-gym-class.component";
import { UpdateGymClassComponent } from "./update-gym-class.component";
import { TrainerAddComponent } from "./trainer/trainer-add.component";
import { TrainerDetailComponent } from "./trainer/trainer-detail.component";
import { RatingComponent } from "./common/rating.component";
import { PageSelectorComponent } from "./common/page-selector.component";
import { LoadingComponent } from "./common/loading.component";
import { ReviewEditorComponent } from "./common/review-editor.component";
import { ReviewListComponent } from "./common/review-list.component";
import { ClassDetailComponent } from "./customer/class-detail.component";

const MY_ROUTES: Routes = [
  { path: "", redirectTo: "classes", pathMatch: "full" },
  { path: "classes", component: ClassesComponent, title: "Classes" },
  {
    path: "classes/add",
    component: AddGymClassComponent,
    title: "AddGymClass",
  },
  {
    path: "classes/update/:class_id",
    component: UpdateGymClassComponent,
    title: "UpdateGymClass",
  },
  {
    path: "my",
    component: MyReservationComponent,
    title: "My Reservations",
  },
  {
    path: "my/class/:class_id",
    component: ClassDetailComponent,
    title: "Class Detail",
  },
  { path: "trainers", component: TrainersComponent, title: "Trainers" },
  {
    path: "trainers/:trainer_id",
    component: TrainerDetailComponent,
    title: "Trainer Detail",
  },
];

@NgModule({
  declarations: [
    ClassesComponent,
    MyReservationComponent,
    AddGymClassComponent,
    UpdateGymClassComponent,
    TrainersComponent,
    TrainerAddComponent,
    TrainerDetailComponent,
    RatingComponent,
    PageSelectorComponent,
    LoadingComponent,
    ReviewEditorComponent,
    ReviewListComponent,
    ClassDetailComponent,
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
