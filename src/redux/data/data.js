import { createMovie } from "../adapter/adapter";

const CUT_LENGTH = 4;

export const initialState = {
  movies: [],
  promoMovie: {},
  movieReviews: [],
  showedMoviesCount: CUT_LENGTH,
};

export const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
};

export const ActionCreator = {
  loadMovies: (data) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: data,
    };
  },

  loadPromoMovie: (data) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: data,
    };
  },

  loadMovieReviews: (data) => {
    return {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: data,
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

export const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      const loadedMovies = response.data.map((movie) => createMovie(movie));
      dispatch(ActionCreator.loadMovies(loadedMovies));
    });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      const loadedPromo = createMovie(response.data);
      dispatch(ActionCreator.loadPromoMovie(loadedPromo));
    });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`).then((response) => {
      const loadedComments = response.data.map((comment) => comment);
      dispatch(ActionCreator.loadMovieReviews(loadedComments));
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return { ...state, movies: action.payload };
    case ActionType.LOAD_PROMO_MOVIE:
      return { ...state, promoMovie: action.payload };
    case ActionType.LOAD_MOVIE_REVIEWS:
      return { ...state, movieReviews: action.payload };
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
