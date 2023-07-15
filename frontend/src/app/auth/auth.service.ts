import { effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../types/user.interface";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  #serviceUrl = "http://localhost:4000";
  #http = inject(HttpClient);

  jwt = signal("");
  user: IUser | null = null;

  bootstrap() {
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
        this.user = jwtDecode(token);
      } else {
        localStorage.removeItem("GR-TOKEN");
        this.user = null;
      }
    });
  }

  get isSignedIn(): boolean {
    return this.jwt() !== "";
  }

  get isAdmin(): boolean {
    return this.user?.role === "admin";
  }

  get isCustomer(): boolean {
    return this.user?.role === "customer";
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

  signin(obj: { email: string; password: string; role: string }) {
    return this.#http.post<{ success: boolean; data: string }>(
      this.#serviceUrl + "/auth/signin",
      obj,
    );
  }
}
