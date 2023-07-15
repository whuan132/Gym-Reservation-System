import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IGymClass } from "../types/gym-class.interface";
import { IPageData } from "../types/page-data.interface";
import { IResponse } from "../types/response.interface";
import { IReview } from "../types/review.interface";
import { ITrainer } from "../types/trainer.interface";

@Injectable({
  providedIn: "root",
})
export class GymClassesService {
  constructor() {}

  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);

  getGymClasss(page: number = 1, page_size: number = 10) {
    return this.#http.get<{ success: boolean; data: IPageData<IGymClass> }>(
      `${this.#serviceUrl}/classes/?page=${page}&page_size=${page_size}`,
    );
  }

  deleteGymClass(id: string) {
    return this.#http.delete<{ success: boolean; data: number }>(
      `${this.#serviceUrl}/classes/${id}`,
    );
  }

  addGymClass(gymClass: IGymClass) {
    return this.#http.post(`${this.#serviceUrl}/classes`, gymClass);
  }

  getGymClass(class_id: string) {
    return this.#http.get<IResponse<IGymClass>>(
      `${this.#serviceUrl}/classes/${class_id}`,
    );
  }

  updateGymClass(class_id: string, updatedGymClass: IGymClass) {
    return this.#http.patch<IResponse>(
      `${this.#serviceUrl}/classes/${class_id}`,
      updatedGymClass,
    );
  }

  addReview(class_id: string, review: IReview) {
    return this.#http.post<IResponse<string>>(
      `${this.#serviceUrl}/classes/${class_id}/reviews`,
      review,
    );
  }

  getReviews(class_id: string, page: number = 1, pageSize: number = 10) {
    return this.#http.get<IResponse<IPageData<IReview>>>(
      `${
        this.#serviceUrl
      }/classes/${class_id}/reviews/?page=${page}&page_size=${pageSize}`,
    );
  }

  getTrainers(class_id: string) {
    return this.#http.get<IResponse<ITrainer[]>>(
      `${this.#serviceUrl}/classes/${class_id}/trainers/`,
    );
  }
}
