import { movies } from "../mock/movies";
import { getMoviesByGenre } from "../utilities/util";
import { DEFAULT_GENRE } from "../utilities/const";

const CUT_LENGTH = 2;

export const initialState = {
  movies,
  moviesByGenre: movies,
  showedMoviesCount: CUT_LENGTH,
  currentGenre: DEFAULT_GENRE,
};

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_GENRE: `SET_GENRE`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
};

export const ActionCreator = {
  getMovies: (genre) => {
    const moviesByGenre = getMoviesByGenre(movies, genre);
    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre,
    };
  },

  setGenre: (genre) => {
    return {
      type: ActionType.SET_GENRE,
      payload: genre,
    };
  },

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: CUT_LENGTH,
  }),

  setDefaultMoviesCount: () => ({
    type: ActionType.SET_DEFAULT_MOVIES_COUNT,
    payload: CUT_LENGTH,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES_BY_GENRE:
      return { ...state, moviesByGenre: action.payload };
    case ActionType.SET_GENRE:
      return { ...state, currentGenre: action.payload };
    case ActionType.SHOW_MORE_MOVIES:
      return {
        ...state,
        showedMoviesCount: state.showedMoviesCount + action.payload,
      };
    case ActionType.SET_DEFAULT_MOVIES_COUNT:
      return { ...state, showedMoviesCount: action.payload };
    default:
      return state;
  }
};
