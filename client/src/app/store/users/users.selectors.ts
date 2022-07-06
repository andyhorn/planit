import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  (state: any) => state['user'].user,
  user => !!user
);

export const getUser = createSelector(
  (state: any) => state['user'].user,
  user => user
);
