import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user)
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials)
  }
}
