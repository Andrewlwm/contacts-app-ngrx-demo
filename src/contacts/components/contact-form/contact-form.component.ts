import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Go } from 'src/app/store/actions/router.actions';
import { selectContactId } from 'src/app/store/selectors/router.selectors';
import { Contact, generateId } from 'src/contacts/contact';
import { addContact } from 'src/contacts/store/actions/contacts.actions';
import { selectContact } from 'src/contacts/store/selectors/selectors.effects';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  notifier$ = new Subject();
  contactForm = this.fb.group({
    id: [generateId()],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
        ),
      ],
    ],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectContactId)
      .pipe(
        takeUntil(this.notifier$),
        switchMap((id) => {
          if (id)
            return this.store.select(selectContact(id)).pipe(
              tap((contact) => {
                this.contactForm.patchValue(contact);
              }),
              take(1)
            );
          return EMPTY;
        })
      )
      .subscribe();
  }

  submit() {
    const { valid, value } = this.contactForm;
    const { ...props } = value;
    const contact: Contact = {
      ...props,
      favourite: false,
    };
    if (valid) this.store.dispatch(addContact({ contact }));
    this.store.dispatch(Go({ path: ['/contacts'] }));
  }
}
