import { DEFAULT_GENRE } from "../../utilities/const";

export const initialState = {
  currentGenre: DEFAULT_GENRE,
};

export const ActionType = {
  SET_GENRE: `SET_GENRE`,
};

export const ActionCreator = {
  setGenre: (genre) => {
    return {
      type: ActionType.SET_GENRE,
      payload: genre,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return { ...state, currentGenre: action.payload };
    default:
      return state;
  }
};
