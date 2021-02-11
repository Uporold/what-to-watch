import { DEFAULT_GENRE } from "../../utilities/const";
// eslint-disable-next-line import/no-cycle
import { InferActionsTypes } from "../reducer";

type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

export const initialState = {
  currentGenre: DEFAULT_GENRE as string,
};

type InitialStateType = typeof initialState;

export const ActionType = {
  SET_GENRE: `SET_GENRE`,
} as const;

export const ActionCreator = {
  setGenre: (genre: string) => {
    return {
      type: ActionType.SET_GENRE,
      payload: genre,
    };
  },
};

export const reducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return { ...state, currentGenre: action.payload };
    default:
      return state;
  }
};
