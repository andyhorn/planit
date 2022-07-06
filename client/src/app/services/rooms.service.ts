import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private httpClient: HttpClient) { }

  public createRoom(name: string): Observable<Room> {
    return this.httpClient.post('api/v1/rooms', {
      name
    }) as Observable<Room>;
  }

  public getRoomByCode(code: string): Observable<Room> {
    return this.httpClient.get(`api/v1/rooms/${code}`) as Observable<Room>;
  }
}
