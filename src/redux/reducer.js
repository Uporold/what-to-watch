import { movies } from "../mock/movies";
import { getMoviesByGenre } from "../utilities/util";

export const initialState = {
  movies,
  moviesByGenre: movies,
  currentGenre: `All genres`,
};

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SET_GENRE: `SET_GENRE`,
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
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES_BY_GENRE:
      return { ...state, moviesByGenre: action.payload };
    case ActionType.SET_GENRE:
      return { ...state, currentGenre: action.payload };
    default:
      return state;
  }
};
