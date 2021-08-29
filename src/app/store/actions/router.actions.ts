import { NavigationExtras, Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const Go = createAction(
  '[Router] Go',
  props<{ path: any[]; queryParams?: Params; extras?: NavigationExtras }>()
);

export const Forward = createAction('[Router] Forward');
export const Back = createAction('[Router] Back');
