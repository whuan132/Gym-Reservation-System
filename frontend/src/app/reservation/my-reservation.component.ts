import { Component, inject } from "@angular/core";
import { MyReservationService } from "./my-reservation.service";
import { Router } from "@angular/router";
import { IGymClass } from "../types/gym-class.interface";

@Component({
  selector: "app-my-reservation",
  template: `
    <div class="center-div">
      <!--      <h3>Reservation List</h3>-->
      <div *ngIf="gymClasses">
        <ul>
          <li *ngFor="let cls of gymClasses">
            {{ cls.name | titlecase }}
            <button
              (click)="deleteReservationByGymClassId(cls._id)"
              style="padding-right: 10px;"
            >
              Delete
            </button>
            <button (click)="updateReservation(cls._id)">Update</button>
          </li>
        </ul>
        <br />
        <button (click)="addReservation()">Add Reservation</button>
      </div>

      <ng-template #loader><h1>Loading...</h1></ng-template>
    </div>
  `,
  styles: [
    `
      .center-div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 300px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
      }

      button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #45a049;
      }
    `,
  ],
})
export class MyReservationComponent {
  #myReServer = inject(MyReservationService);
  #router = inject(Router);

  gymClasses: IGymClass[] = [];

  ngOnInit() {
    this.fetchMyReservations();
  }

  fetchMyReservations() {
    this.#myReServer.getReservations().subscribe(
      (res) => {
        console.log(res);
        this.gymClasses = res.data.data;
        // console.log("gymClasses: " + JSON.stringify(this.gymClasses.at(0)));
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteReservationByGymClassId(gymClass_id: string) {
    this.#myReServer.deleteReservationByGymClassId(gymClass_id).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      },
    );
  }
  updateReservation(res_id: string) {}
  addReservation() {}
}
