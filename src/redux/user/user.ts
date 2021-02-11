import history from "../../history";
import { createUser } from "../adapter/adapter";
import { LoginData, UserLogged } from "../../utilities/types";
// eslint-disable-next-line import/no-cycle
import { BaseThunkActionType, InferActionsTypes } from "../reducer";

type UserActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<UserActionTypes>;

export const initialState = {
  authorizationStatus: false as boolean,
  user: {
    id: -1,
    email: ``,
    avatar: ``,
    name: ``,
  } as UserLogged,
  isAuthorizationLoading: true as boolean,
};

type InitialStateType = typeof initialState;

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  GET_USER_DATA: `GET_USER_DATA`,
  FINISH_AUTHORIZATION: `FINISH_AUTHORIZATION`,
} as const;

export const ActionCreator = {
  finishAuthorizationLoading: () => {
    return {
      type: ActionType.FINISH_AUTHORIZATION,
      payload: false,
    };
  },

  setAuthorizationStatus: (status: boolean) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  getUserData: (userData: UserLogged) => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: userData,
    };
  },
};

export const reducer = (
  state = initialState,
  action: UserActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.GET_USER_DATA:
      return { ...state, user: action.payload };
    case ActionType.FINISH_AUTHORIZATION:
      return { ...state, isAuthorizationLoading: action.payload };
    default:
      return state;
  }
};

export const Operation = {
  checkAuth: (): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ): Promise<void> => {
    try {
      const response = await api.get(`/login`);
      dispatch(ActionCreator.setAuthorizationStatus(true));
      dispatch(ActionCreator.getUserData(createUser(response.data)));
      dispatch(ActionCreator.finishAuthorizationLoading());
    } catch (e) {
      dispatch(ActionCreator.setAuthorizationStatus(false));
      dispatch(ActionCreator.finishAuthorizationLoading());
    }
  },

  login: (authData: LoginData): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ): Promise<void> => {
    const response = await api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    });
    dispatch(ActionCreator.setAuthorizationStatus(true));
    dispatch(ActionCreator.getUserData(createUser(response.data)));
    history.push(`/`);
  },
};
