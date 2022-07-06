import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public roomName: string = '';
  public roomCode: string = '';

  constructor(private route: ActivatedRoute, private roomsService: RoomsService) { }

  ngOnInit(): void {
    console.log(this.route);
    this.roomCode = this.route.snapshot.params['code'];
    this.roomsService.getRoomByCode(this.roomCode).subscribe(room => {
      this.roomName = room.name;
    });
  }

}
