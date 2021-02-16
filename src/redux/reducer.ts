import { Action, combineReducers } from "redux";
import { AxiosInstance } from "axios";
import { ThunkAction } from "redux-thunk";
// eslint-disable-next-line import/no-cycle
import { reducer as data, ActionCreator as DataActions } from "./data/data";
// eslint-disable-next-line import/no-cycle
import { reducer as app, ActionCreator as AppActions } from "./app/app";
// eslint-disable-next-line import/no-cycle
import { reducer as user, ActionCreator as UserActions } from "./user/user";

export const rootReducer = combineReducers({
  DATA: data,
  APP: app,
  USER: user,
});

export type GlobalState = ReturnType<typeof rootReducer>;

const combinedActions = { ...DataActions, ...AppActions, ...UserActions };
export type AllReduxActions = ReturnType<
  InferActionsTypes<typeof combinedActions>
>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<A extends Action = Action> = ThunkAction<
  Promise<void>,
  GlobalState,
  AxiosInstance,
  A
>;
