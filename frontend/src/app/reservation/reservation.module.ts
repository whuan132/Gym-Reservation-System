import { NgModule } from "@angular/core";
import { CommonModule, NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { ClassesComponent } from "./classes.component";
import { MyReservationComponent } from "./my-reservation.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";
import { TrainersComponent } from "./trainers.component";
import { AddGymClassComponent } from "./add-gym-class.component";
import { UpdateGymClassComponent } from "./update-gym-class.component";
import { TrainerAddComponent } from "./trainer-add.component";

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
  { path: "trainers", component: TrainersComponent, title: "Trainers" },
];

@NgModule({
  declarations: [
    ClassesComponent,
    MyReservationComponent,
    AddGymClassComponent,
    UpdateGymClassComponent,
    TrainersComponent,
    TrainerAddComponent,
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
  ],
  providers: [GymClassesService],
  exports: [RouterModule],
})
export class ReservationModule {}
