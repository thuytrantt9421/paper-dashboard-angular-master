import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "app/api/api";
import { Subscription } from "rxjs";

@Component({
  selector: "login-cmp",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // Login form group
  public loginForm: FormGroup;

  // Create subscription for page
  private _subscription: Subscription;

  public user = {
    username: "",
    password: "",
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this._subscription = new Subscription();
  }
  ngOnInit() {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public initLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  public submitLogin() {
    const controls = this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAllAsTouched()
      );
      return;
    }

    this.user = {
      username: controls.username.value,
      password: controls.password.value,
    };

    this.apiService
      .login(this.user.username, this.user.password)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          window.sessionStorage.setItem("token", res.token);
          this.router.navigate(["user"]);
        }
      });
  }
}
