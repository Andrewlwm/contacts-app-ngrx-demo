import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const { selectRouteParams, selectUrl, selectQueryParam } =
  getSelectors(selectRouter);
export const selectContactId = createSelector(
  selectRouteParams,
  ({ id }) => id
);
export const selectIsFavourite = createSelector(selectUrl, (url) =>
  url.includes('favourites')
);
