import { DEFAULT_GENRE } from "../../utilities/const";

const CUT_LENGTH = 2;

export const initialState = {
  currentGenre: DEFAULT_GENRE,
};

export const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
};

export const ActionCreator = {
  setGenre: (genre) => {
    return {
      type: ActionType.SET_GENRE,
      payload: genre,
    };
  },

  setDefaultMoviesCount: () => ({
    type: ActionType.SET_DEFAULT_MOVIES_COUNT,
    payload: CUT_LENGTH,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return { ...state, currentGenre: action.payload };
    case ActionType.SET_DEFAULT_MOVIES_COUNT:
      return { ...state, showedMoviesCount: action.payload };
    default:
      return state;
  }
};
