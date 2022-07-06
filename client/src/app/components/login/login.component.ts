import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public onCreateRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form);
  }

  public onJoinRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form);
  }
}
