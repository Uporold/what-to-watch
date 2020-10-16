import { movies } from "../../mock/movies";

const CUT_LENGTH = 2;

export const initialState = {
  movies,
  showedMoviesCount: CUT_LENGTH,
};

export const ActionType = {
  GET_MOVIES: `GET_MOVIES`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
};

export const ActionCreator = {
  getMovies: () => {
    return {
      type: ActionType.GET_MOVIES,
      payload: movies,
    };
  },

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: CUT_LENGTH,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES:
      return { ...state, moviesByGenre: action.payload };
    case ActionType.SHOW_MORE_MOVIES:
      return {
        ...state,
        showedMoviesCount: state.showedMoviesCount + action.payload,
      };
    default:
      return state;
  }
};
