import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IPageData } from "../../types/page-data.interface";
import { IResponse } from "../../types/response.interface";
import { IUser } from "../../types/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);

  getUsers(page: number, pageSize: number) {
    return this.#http.get<IResponse<IPageData<IUser>>>(
      this.#serviceUrl + `/users/?page=${page}&page_size=${pageSize}`,
    );
  }

  getUserById(userId: string) {
    return this.#http.get<IResponse<IUser>>(
      this.#serviceUrl + `/users/${userId}`,
    );
  }

  updateUserById(userId: string, user: IUser) {
    return this.#http.patch<IResponse>(
      `${this.#serviceUrl}/users/${userId}`,
      user,
    );
  }

  deleteUserById(userId: string) {
    return this.#http.delete<{ success: boolean; data: number }>(
      `${this.#serviceUrl}/users/${userId}`,
    );
  }
}
