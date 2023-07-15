import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IGymClass } from "../../types/gym-class.interface";
import { IPageData } from "../../types/page-data.interface";

@Injectable({
  providedIn: "root",
})
export class MyReservationService {
  #api = "http://localhost:4000";
  #http = inject(HttpClient);

  constructor() {}

  getReservations(page: number = 1, page_size: number = 10) {
    return this.#http.get<{ success: boolean; data: IPageData<IGymClass> }>(
      `${this.#api}/customer/reservations/?page=${page}&page_size=${page_size}`,
    );
  }
  deleteReservationByGymClassId(cls_id: string) {
    return this.#http.delete<{ success: boolean; data: number }>(
      `${this.#api}/customer/reservations/${cls_id}`,
    );
  }
}
