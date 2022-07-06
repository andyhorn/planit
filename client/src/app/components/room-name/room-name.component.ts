import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.scss']
})
export class RoomNameComponent implements OnInit {
  public name: string = '';

  constructor(private dialogRef: MatDialogRef<RoomNameComponent>) { }

  ngOnInit(): void {
  }

  public onClose() {
    this.dialogRef.close(this.name);
  }
}
