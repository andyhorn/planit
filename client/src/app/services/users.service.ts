import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public create(firstName: string, lastName: string): Observable<User> {
    return this.httpClient.post('api/v1/users', {
      firstName,
      lastName
    }) as Observable<User>;
  }
}
