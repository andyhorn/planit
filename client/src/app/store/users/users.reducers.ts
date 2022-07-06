import { createReducer, on, State } from "@ngrx/store";
import { setUser, removeUser } from "./users.actions";

export const initialState = {
  user: <any>undefined
};

export const usersReducer = createReducer(
  initialState,
  on(setUser, (state, action) => { return { user: action.user } }),
  on(removeUser, (state, action) => { return { user: undefined } })
)
