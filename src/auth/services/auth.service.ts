import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store) {}

  validUser = {
    username: 'test@test.com',
    password: 'parola',
  };

  login(username: string, password: string) {
    const { username: _n, password: _p } = this.validUser;
    if (username === _n && password === _p) return of({ user: { username } });
    return throwError('Invalid credentials!');
  }
}
