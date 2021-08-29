import { createFeature } from '@ngrx/store';
import { reducer } from '../reducers/auth.reducer';

const authFeature = createFeature({
  name: 'auth',
  reducer: reducer,
});

export const { selectAuthState, selectUser, selectError } = authFeature;
