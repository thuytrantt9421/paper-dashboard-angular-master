import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    if (sessionStorage.getItem("token")) {
      return of(true);
    }

    this.router.navigate(["/login"]);
    return of(false);
  }
}
