import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-code',
  templateUrl: './room-code.component.html',
  styleUrls: ['./room-code.component.scss']
})
export class RoomCodeComponent implements OnInit {
  public code: string = '';

  constructor(private dialogRef: MatDialogRef<RoomCodeComponent>) { }

  ngOnInit(): void {
  }

  public onClose() {
    this.dialogRef.close(this.code);
  }
}
