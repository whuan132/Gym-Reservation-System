import { Component, inject } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { IGymClass } from "../types/gym-class.interface";

@Component({
  selector: "app-add-gym-class",
  template: `
    <div class="mt-20"></div>
    <h1>add-gym-class works!</h1>
    <form (submit)="addGymClass()">
      <label> Name: <input [(ngModel)]="newClass.name" name="name" /> </label>
      <label>
        Description:
        <input [(ngModel)]="newClass.description" name="description" />
      </label>
      <label>
        Capacity: <input [(ngModel)]="newClass.capacity" name="capacity" />
      </label>
      <label>
        Rating: <input [(ngModel)]="newClass.rating" name="rating" />
      </label>
      <label>
        StartDate:
        <input type="date" [(ngModel)]="newClass.startDate" name="startDate" />
      </label>
      <label>
        EndDate:
        <input type="date" [(ngModel)]="newClass.endDate" name="endDate" />
      </label>
      <button type="submit">Add Course</button>
    </form>
  `,
  styles: [],
})
export class AddGymClassComponent {
  #classServer = inject(GymClassesService);
  #classCompont = inject(GymClassesService);
  authService = inject(AuthService);
  #router = inject(Router);
  newClass = {
    name: "",
    description: "",
    capacity: 1,
    rating: 0,
    startDate: new Date(),
    endDate: new Date(),
  } as IGymClass;

  addGymClass() {
    this.#classServer.addGymClass(this.newClass).subscribe(
      () => {
        this.#router.navigate(["/reservation/classes"]);
        this.newClass = {
          name: "",
          description: "",
          capacity: 1,
          rating: 0,
          startDate: new Date(),
          endDate: new Date(),
        } as IGymClass;
      },
      (error) => {
        console.error(error);
      },
    );
  }
}
