import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Contact } from 'src/contacts/contact';
import { removeContact } from 'src/contacts/store/actions/contacts.actions';

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete.dialog.html',
})
export class ConfirmDeleteDialog {
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }
}
