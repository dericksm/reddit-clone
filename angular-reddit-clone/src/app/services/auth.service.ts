import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SignupRequestPayload } from "../models/signup-request";
import { Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginRequestPayload } from "../models/login-request";
import { LoginResponse } from "../models/login-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };

  private apiURL: string = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  signUp(signUpPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(this.apiURL + "/signup", signUpPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http
      .post<LoginResponse>(this.apiURL + "/login", loginRequestPayload)
      .pipe(
        map((res) => {
          localStorage.setItem("authenticationToken", res.authenticationToken);
          localStorage.setItem("username", res.username);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("expiresAt", res.expiresAt.toString());

          this.loggedIn.emit(true);
          this.username.emit(res.username);
          return true;
        })
      );
  }

  refreshToken() {
    return this.http
      .post<LoginResponse>(
        this.apiURL + "/refresh-token",
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          localStorage.removeItem("authenticationToken");
          localStorage.removeItem("expiresAt");

          localStorage.setItem(
            "authenticationToken",
            response.authenticationToken
          );
          localStorage.setItem("expiresAt", response.expiresAt.toString());
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem("authenticationToken");
  }

  getUserName() {
    return localStorage.getItem("username");
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.http
      .post(this.apiURL + "/logout", this.refreshTokenPayload, {
        responseType: "text",
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    localStorage.removeItem("authenticationToken");
    localStorage.removeItem("username");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
  }
}
