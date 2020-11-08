import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SubSink } from "subsink";
import { SignupRequestPayload } from '../../../models/signup-request';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupRequestPayload: SignupRequestPayload;
  public signUpForm: FormGroup;
  private subs = new SubSink();

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private createForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  public signUp(){
    this.signupRequestPayload = this.signUpForm.value
    
    this.subs.sink = this.authService.signUp(this.signupRequestPayload).subscribe(
      res => {
        this.router.navigate(["/login"], { queryParams: { registered: true } });
    }, err => {
        this.toastService.error("Registration falied! Please try it again...");
    });
  }

  public get emailInvalid() {
    return (
      !this.signUpForm.get("email").valid && this.signUpForm.get("email").dirty
    );
  }

  public get usernameInvalid() {
    return (
      !this.signUpForm.get("username").valid &&
      this.signUpForm.get("username").dirty
    );
  }

  public get passwordInvalid() {
    return (
      !this.signUpForm.get("password").valid &&
      this.signUpForm.get("password").dirty
    );
  }

  public get isFormValid() {
    return this.signUpForm.valid;
  }
}
