import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IPageData } from "../../types/page-data.interface";
import { ITrainer } from "../../types/trainer.interface";
import { IResponse } from "../../types/response.interface";
import { IReview } from "../../types/review.interface";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);

  getTrainers(page: number, pageSize: number) {
    return this.#http.get<IResponse<IPageData<ITrainer>>>(
      this.#serviceUrl + `/trainers/?page=${page}&page_size=${pageSize}`,
    );
  }

  getTrainerById(trainerId: string) {
    return this.#http.get<IResponse<ITrainer>>(
      this.#serviceUrl + `/trainers/${trainerId}`,
    );
  }

  addTrainer(obj: ITrainer) {
    return this.#http.post<IResponse<string>>(
      this.#serviceUrl + `/trainers/`,
      obj,
    );
  }

  addReview(trainer_id: string, obj: IReview) {
    return this.#http.post<IResponse<string>>(
      this.#serviceUrl + `/trainers/${trainer_id}/reviews`,
      obj,
    );
  }

  getReviews(trainer_id: string, page: number, pageSize: number) {
    return this.#http.get<IResponse<IPageData<IReview>>>(
      this.#serviceUrl +
        `/trainers/${trainer_id}/reviews/?page=${page}&page_size=${pageSize}`,
    );
  }
}
