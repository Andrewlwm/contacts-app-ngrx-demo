import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactsListComponent } from './containers/contacts-list/contacts-list.component';
import { ContactExistsGuard } from './guards/contact-exists.guard';
import { LoadedGuard } from './guards/loaded.guard';

const routes: Routes = [
  {
    path: 'favourites',
    component: ContactsListComponent,
    canActivate: [LoadedGuard],
  },
  {
    path: 'new',
    component: ContactFormComponent,
  },
  {
    path: ':id',
    component: ContactFormComponent,
    canActivate: [ContactExistsGuard],
  },

  { path: '', component: ContactsListComponent, canActivate: [LoadedGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
