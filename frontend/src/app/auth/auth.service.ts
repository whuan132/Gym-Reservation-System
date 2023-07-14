import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../types/user.interface";
import jwtDecode from "jwt-decode";

const DEFAULT_USER = {
  _id: "",
  name: "",
  email: "",
  password: "",
  role: "",
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);

  jwt = signal("");
  user = signal<IUser>(DEFAULT_USER);

  bootstrapFactory() {
    const token = localStorage.getItem("GR-TOKEN");
    if (token) {
      this.jwt.set(token);
    }
  }

  constructor() {
    effect(() => {
      const token = this.jwt();
      if (token) {
        localStorage.setItem("GR-TOKEN", token);
      } else {
        localStorage.removeItem("GR-TOKEN");
      }
    });
    computed(() => {
      const token = this.jwt();
      if (token) {
        this.user.set(jwtDecode(token));
      } else {
        this.user.set(DEFAULT_USER);
      }
    });
  }

  get isSignedIn(): boolean {
    return this.jwt() !== "";
  }

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

  signin(obj: { email: string; password: string }) {
    return this.#http.post<{ success: boolean; data: string }>(
      this.#serviceUrl + "/auth/signin",
      obj,
    );
  }
}
