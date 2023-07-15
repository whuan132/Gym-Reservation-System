import { Component, inject } from "@angular/core";
import { GymClassesService } from "./gym-classes.service";
import { IGymClass } from "../types/gym-class.interface";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-classes",
  template: `
    <div class="mt-20" id="addNewGymClass">
      <button
        *ngIf="authService.isAdmin"
        class="btn btn-outline btn-accent"
        (click)="addGymClass()"
      >
        Add Gym Class
      </button>
    </div>
    <div
      class="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="card shadow-lg compact side bg-base-100 m-2"
        *ngFor="let gymClass of gymClasses"
      >
        <div class="flex-none w-48 relative">
          <img
            src="your_image_source"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ gymClass.name }}</h2>
          <p>{{ gymClass.description }}</p>
          <div class="divider"></div>
          <div class="prose prose-sm">
            <p><b>Capacity:</b> {{ gymClass.capacity }}</p>
            <p><b>Rating:</b> {{ gymClass.rating }}</p>
            <p><b>StartDate:</b> {{ gymClass.startDate | date }}</p>
            <p><b>EndDate:</b> {{ gymClass.endDate | date }}</p>
          </div>
          <div class="justify-end card-actions">
            <button
              *ngIf="authService.isAdmin"
              class="btn btn-outline btn-accent"
              (click)="deleteGymClass(gymClass._id)"
            >
              Delete
            </button>
            <a
              *ngIf="authService.isAdmin"
              class="btn btn-outline btn-accent"
              [routerLink]="[
                '',
                'reservation',
                'classes',
                'update',
                gymClass._id
              ]"
            >
              Update
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ClassesComponent {
  #classServer = inject(GymClassesService);
  authService = inject(AuthService);
  #router = inject(Router);

  gymClasses: IGymClass[] = [];

  ngOnInit() {
    this.fetchGymClasss();
  }

  fetchGymClasss() {
    this.#classServer.getGymClasss().subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data.data;
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteGymClass(id: string) {
    this.#classServer.deleteGymClass(id).subscribe(
      () => {
        this.fetchGymClasss();
      },
      (error) => {
        console.error(error);
      },
    );
  }

  addGymClass() {
    this.#router.navigate(["/reservation/classes/add"]);
  }
}
