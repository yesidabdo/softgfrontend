import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
import { Router,ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

    @Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    return true;
  }
}

