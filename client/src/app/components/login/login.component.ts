import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersService } from 'src/app/services/users.service';
import { setUser } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public firstName: string = '';
  public lastName: string = '';

  constructor(private usersService: UsersService, private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  public async onCreateRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    await this.createUser();
    this.navigateToHome();
  }

  public async onJoinRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    await this.createUser();
    this.navigateToHome();
  }

  private async createUser() {
    const user = await this.usersService.create(this.firstName, this.lastName).toPromise();
    this.store.dispatch(setUser({ user }));
  }

  private navigateToHome() {
    this.router.navigateByUrl('/');
  }
}
