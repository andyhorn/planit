import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room';
import { RoomsService } from 'src/app/services/rooms.service';
import { UsersService } from 'src/app/services/users.service';
import { setUser } from 'src/app/store/users/users.actions';
import { RoomCodeComponent } from '../room-code/room-code.component';
import { RoomNameComponent } from '../room-name/room-name.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public firstName: string = '';
  public lastName: string = '';

  constructor(
    private usersService: UsersService,
    private roomsService: RoomsService,
    private store: Store,
    private router: Router,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public async onCreateRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    await this.createUser();
    const roomName = await this.getRoomName();
    const room = await this.createRoom(roomName).toPromise();
    this.navigateToRoom(room.code);
  }

  public async onJoinRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    await this.createUser();
    const roomCode = await this.joinRoom();
    this.navigateToRoom(roomCode);
  }

  private async createUser() {
    const user = await this.usersService.create(this.firstName, this.lastName).toPromise();
    this.store.dispatch(setUser({ user }));
  }

  private async getRoomName(): Promise<string> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialogService.open(RoomNameComponent);
      dialogRef.afterClosed().subscribe(name => {
        resolve(name);
      });
    });
  }

  private createRoom(name: string): Observable<Room> {
    return this.roomsService.createRoom(name);
  }

  private async joinRoom(): Promise<string> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialogService.open(RoomCodeComponent);
      dialogRef.afterClosed().subscribe(code => {
        resolve(code);
      });
    });
  }

  private navigateToRoom(code: string) {
    this.router.navigateByUrl(`room/${code}`);
  }
}
