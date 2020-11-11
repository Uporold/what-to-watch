import { createMovie } from "../adapter/adapter";
import history from "../../history";

const CUT_LENGTH = 4;

export const initialState = {
  movies: [],
  promoMovie: {},
  favoriteMovies: [],
  movieReviews: [],
  showedMoviesCount: CUT_LENGTH,
  isDataLoading: true,
  isFavoritesLoading: true,
  isSendingError: false,
  isReviewSending: false,
};

export const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  SET_DEFAULT_MOVIES_COUNT: `SET_DEFAULT_MOVIES_COUNT`,
  FINISH_LOADING: `FINISH_LOADING`,
  FINISH_FAVORITES_LOADING: `FINISH_FAVORITES_LOADING`,
  UPDATE_FAVORITE_STATUS: `UPDATE_FAVORITE_STATUS`,
  SET_SENDING_ERROR_STATUS: `SET_SENDING_ERROR_STATUS`,
  SET_REVIEW_SENDING_STATUS: `SET_REVIEW_SENDING_STATUS`,
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

  loadFavoriteMovies: (data) => {
    return {
      type: ActionType.LOAD_FAVORITE_MOVIES,
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

  finishLoading: () => {
    return {
      type: ActionType.FINISH_LOADING,
      payload: false,
    };
  },

  finishFavoritesLoading: () => {
    return {
      type: ActionType.FINISH_FAVORITES_LOADING,
      payload: false,
    };
  },

  updateFavoriteStatus: (movie) => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: movie,
    };
  },

  setSendingErrorStatus: (status) => {
    return {
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: status,
    };
  },

  setReviewSendingStatus: (status) => {
    return {
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: status,
    };
  },
};

export const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      const loadedMovies = response.data.map((movie) => createMovie(movie));
      dispatch(ActionCreator.loadMovies(loadedMovies));
      dispatch(ActionCreator.finishLoading());
    });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      const loadedPromo = createMovie(response.data);
      dispatch(ActionCreator.loadPromoMovie(loadedPromo));
    });
  },

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      const loadedMovies = response.data.map((movie) => createMovie(movie));
      dispatch(ActionCreator.loadFavoriteMovies(loadedMovies));
      dispatch(ActionCreator.finishFavoritesLoading());
    });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`).then((response) => {
      const loadedComments = response.data.map((comment) => comment);
      dispatch(ActionCreator.loadMovieReviews(loadedComments));
    });
  },

  sendReview: (movieId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setReviewSendingStatus(true));
    return api
      .post(`/comments/${movieId}`, {
        comment: review.comment,
        rating: review.rating,
      })
      .then(() => {
        dispatch(ActionCreator.setSendingErrorStatus(false));
        dispatch(ActionCreator.setReviewSendingStatus(false));
        history.goBack();
      })
      .catch(() => {
        dispatch(ActionCreator.setSendingErrorStatus(true));
        dispatch(ActionCreator.setReviewSendingStatus(false));
      });
  },

  changeMovieFavoriteStatus: (movieId, isFavorite) => (
    dispatch,
    getState,
    api
  ) => {
    return api
      .post(`/favorite/${movieId}/${isFavorite ? 1 : 0}`, {})
      .then((response) => {
        dispatch(
          ActionCreator.updateFavoriteStatus(createMovie(response.data))
        );
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return { ...state, movies: action.payload };
    case ActionType.LOAD_PROMO_MOVIE:
      return { ...state, promoMovie: action.payload };
    case ActionType.LOAD_FAVORITE_MOVIES:
      return { ...state, favoriteMovies: action.payload };
    case ActionType.LOAD_MOVIE_REVIEWS:
      return { ...state, movieReviews: action.payload };
    case ActionType.SHOW_MORE_MOVIES:
      return {
        ...state,
        showedMoviesCount: state.showedMoviesCount + action.payload,
      };
    case ActionType.SET_DEFAULT_MOVIES_COUNT:
      return { ...state, showedMoviesCount: action.payload };
    case ActionType.FINISH_LOADING:
      return { ...state, isDataLoading: action.payload };
    case ActionType.FINISH_FAVORITES_LOADING:
      return { ...state, isFavoritesLoading: action.payload };
    case ActionType.UPDATE_FAVORITE_STATUS: {
      const favoriteIndex = state.movies.findIndex(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        movies: [].concat(
          ...state.movies.slice(0, favoriteIndex),
          action.payload,
          ...state.movies.slice(favoriteIndex + 1, state.movies.length)
        ),
        promoMovie:
          state.promoMovie.id === action.payload.id
            ? action.payload
            : state.promoMovie,
      };
    }
    case ActionType.SET_SENDING_ERROR_STATUS:
      return { ...state, isSendingError: action.payload };
    case ActionType.SET_REVIEW_SENDING_STATUS:
      return { ...state, isReviewSending: action.payload };
    default:
      return state;
  }
};
