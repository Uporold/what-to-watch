import history from "../../history";
import { createUser } from "../adapter/adapter";

export const initialState = {
  authorizationStatus: false,
  user: {},
};

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  GET_USER_DATA: `GET_USER_DATA`,
};

export const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  getUserData: (userData) => {
    return {
      type: ActionType.GET_USER_DATA,
      payload: userData,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.GET_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(true));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorizationStatus(false));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.email,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(true));
        dispatch(ActionCreator.getUserData(createUser(response.data)));
        history.push(`/`);
      });
  },
};
