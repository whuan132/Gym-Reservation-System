import {Component, inject} from '@angular/core';
import {GymClassesService} from "./gym-classes.service";
import {IGymClass} from "../types/gym-class.interface";

@Component({
    selector: 'app-classes',
    template: `
        <ul>
            <li *ngFor="let gymClass of gymClasses">
                Name: {{ gymClass.name }} <br>
                Description: {{ gymClass.description }} <br>
                Capacity: {{ gymClass.capacity }} <br>
                Rating: {{ gymClass.rating }} <br>
                StartDate: {{ gymClass.startDate }} <br>
                EndDate: {{ gymClass.endDate }} 
                <button (click)="deleteGymClass(gymClass._id)">Delete</button>
            </li>
        </ul>
    `,
    styles: []
})
export class ClassesComponent {
    #classServer = inject(GymClassesService);

    gymClasses: IGymClass[] = [];


    ngOnInit() {
        this.fetchGymClasss();
    }


    fetchGymClasss() {
        this.#classServer.getGymClasss().subscribe(
            (res) => {
                this.gymClasses = res.data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    deleteGymClass(id: string) {
        this.#classServer.deleteGymClass(id).subscribe(
            () => {
                this.fetchGymClasss();
            },
            (error) => {
                console.error(error);
            }
        );
    }


}
