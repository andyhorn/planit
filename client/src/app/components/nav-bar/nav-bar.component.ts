import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { removeUser } from 'src/app/store/users/users.actions';
import { getUser, isLoggedIn } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public user$: Observable<User> = this.store.select(getUser);
  public isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  public handleLogout() {
    this.store.dispatch(removeUser());
    this.router.navigateByUrl('/login');
  }
}
