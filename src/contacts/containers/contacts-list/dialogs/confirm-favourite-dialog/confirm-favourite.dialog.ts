import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Contact } from 'src/contacts/contact';
import { favouriteContact } from 'src/contacts/store/actions/contacts.actions';

@Component({
  selector: 'confirm-favourite-dialog',
  templateUrl: 'confirm-favourite.dialog.html',
})
export class ConfirmFavouriteDialog {
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ConfirmFavouriteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmFavourite() {
    this.dialogRef.close(true);
  }
}
