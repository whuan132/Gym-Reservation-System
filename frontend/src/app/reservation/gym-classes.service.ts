import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGymClass} from "../types/gym-class.interface";

@Injectable({
  providedIn: 'root'
})
export class GymClassesService {

  constructor() { }



  #serviceUrl = 'http://localhost:4000';
  #http = inject(HttpClient);


  getGymClasss(page:number = 1,page_size:number =10){
    return this.#http.get<{ success: boolean; data: IGymClass[] }>(
        `${this.#serviceUrl}/classes/?page=${page}&page_size=${page_size}`);
  }

  deleteGymClass(id: string) {
    return this.#http.delete<{ success: boolean; data: number }>(`${this.#serviceUrl}/classes/${id}`);
  }

  addGymClass(GymClass: any) {
    return this.#http.post(`${this.#serviceUrl}/classes`, GymClass);
  }

  getGymClass(class_id: string) {
    return this.#http.get(`${this.#serviceUrl}/classes/${class_id}`);
  }

  updateGymClass(class_id: string, updatedGymClass: IGymClass) {
    return this.#http.put(`${this.#serviceUrl}/classes/${class_id}`, updatedGymClass);
  }





}
