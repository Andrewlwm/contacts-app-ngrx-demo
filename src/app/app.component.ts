import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/auth/store/actions/auth.actions';
import { selectUser } from 'src/auth/store/selectors/auth.selectors';
import { Contact, contacts } from 'src/contacts/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(logout());
  }
}
