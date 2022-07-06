import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { removeUser } from 'src/app/store/users/users.actions';
import { isLoggedIn } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public user$!: Observable<User>;
  public isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.user$ = this.store.select((state: any) => state['user'].user);
  }

  public handleLogout() {
    this.store.dispatch(removeUser());
  }
}
