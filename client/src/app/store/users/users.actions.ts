import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const setUser = createAction('[Users] Set', props<{ user: User }>());
export const removeUser = createAction('[Users] Remove');
