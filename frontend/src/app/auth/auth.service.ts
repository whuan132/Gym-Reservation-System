import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../types/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);
  constructor() {}

  jwt = signal("");

  signup(user: IUser) {
    return this.#http.post<{ success: boolean; data: string }>(
      `${this.#serviceUrl}/auth/signup`,
      user,
    );
  }

  changePassword(password: string) {
    return this.#http.patch<{ success: boolean; data: string }>(
      `${this.#serviceUrl}/auth/password`,
      { password },
    );
  }
}
