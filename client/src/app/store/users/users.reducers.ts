import { createReducer, on, State } from "@ngrx/store";
import { setUser, removeUser } from "./users.actions";

export const initialState = {};

export const usersReducer = createReducer(
  initialState,
  on(setUser, (state, action) => action.user),
  on(removeUser, (state, action) => { return {} })
)
