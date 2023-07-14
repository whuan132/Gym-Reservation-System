import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClassesComponent } from "./classes.component";
import { MyReservationComponent } from "./my-reservation.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { GymClassesService } from "./gym-classes.service";

const MY_ROUTES: Routes = [
  { path: "", redirectTo: "classes", pathMatch: "full" },
  { path: "classes", component: ClassesComponent, title: "Classes" },
  {
    path: "my",
    component: MyReservationComponent,
    title: "My Reservations",
  },
];

@NgModule({
  declarations: [ClassesComponent, MyReservationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(MY_ROUTES),
  ],
  providers: [GymClassesService],
  exports: [RouterModule],
})
export class ReservationModule {}