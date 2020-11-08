import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SubSink } from "subsink";
import { AuthService } from "../../../services/auth.service";
import { LoginRequestPayload } from "../../../models/login-request";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private subs = new SubSink();
  public isError: boolean = false;  
  public registerSuccessMessage: string = "";

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.activatedRoute.queryParams.subscribe(paramns => {
      if(paramns.registered !== undefined && paramns.registered === 'true'){
        this.toastService.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email activate your account before you Login!';
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  public login(): void {
    const payload: LoginRequestPayload = this.loginForm.value;
    this.authService.login(payload).subscribe(
      (res) => {
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastService.success('Login Successful');
      },
      (err) => {        
        this.isError = true;
        throwError(err);
      }
    );
  }

  public get usernameInvalid() {
    return (
      !this.loginForm.get("username").valid &&
      this.loginForm.get("username").dirty
    );
  }

  public get passwordInvalid() {
    return (
      !this.loginForm.get("password").valid &&
      this.loginForm.get("password").dirty
    );
  }
}
