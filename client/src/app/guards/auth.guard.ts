import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { isLoggedIn } from "../store/users/users.selectors";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

}
