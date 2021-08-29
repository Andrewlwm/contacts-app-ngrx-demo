import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/contacts/contact';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css'],
})
export class ContactsTableComponent {
  @Input() contacts!: Observable<Contact[]>;
  columnsToDisplay = ['name', 'email', 'phoneNumber', 'actions'];
  @Output() favorite = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<Contact>();
  constructor() {}

  toggleFavourite(contact: Contact) {
    this.favorite.emit(contact);
  }

  deleteContact(contact: Contact) {
    this.delete.emit(contact);
  }
}
