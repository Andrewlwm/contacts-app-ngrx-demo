import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/auth/services/auth.service';
import { login } from 'src/auth/store/actions/auth.actions';
import { selectError } from 'src/auth/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  hide = true;
  error = this.store.select(selectError);

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  login() {
    if (!this.loginForm.valid) return;
    const { username, password } = this.loginForm.value;
    this.store.dispatch(login({ username, password }));
  }
}
