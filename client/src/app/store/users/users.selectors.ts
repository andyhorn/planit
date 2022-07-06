import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  (state: any) => state['user'].user,
  user => !!user
);
