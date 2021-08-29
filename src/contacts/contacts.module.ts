import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './store/effects/contacts.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/contacts.reducer';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { MaterialModule } from 'src/material/material.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactsListComponent } from './containers/contacts-list/contacts-list.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { ConfirmDeleteDialog } from './containers/contacts-list/dialogs/confirm-delete-dialog/confirm-delete.dialog';
import { ConfirmFavouriteDialog } from './containers/contacts-list/dialogs/confirm-favourite-dialog/confirm-favourite.dialog';
import { RoNumPipe } from './pipes/ro-num.pipe';

@NgModule({
  declarations: [
    ContactsTableComponent,
    ContactFormComponent,
    ContactsListComponent,
    SearchFormComponent,
    ConfirmDeleteDialog,
    ConfirmFavouriteDialog,
    RoNumPipe,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    EffectsModule.forFeature([ContactsEffects]),
    StoreModule.forFeature('contacts', reducer),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class ContactsModule {}
