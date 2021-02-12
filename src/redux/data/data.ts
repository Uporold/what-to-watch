import { AxiosResponse } from "axios";
import { createMovie } from "../adapter/adapter";
import history from "../../history";
import { Movie, MovieBackend, Review, ReviewPure } from "../../utilities/types";
// eslint-disable-next-line import/no-cycle
import { BaseThunkActionType, InferActionsTypes } from "../reducer";

const CUT_LENGTH = 4;

type UserActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<UserActionTypes>;

export const initialState = {
  movies: [] as Array<Movie>,
  promoMovie: {} as Movie,
  favoriteMovies: [] as Array<Movie>,
  movieReviews: [] as Array<Review>,
  showedMoviesCount: CUT_LENGTH as number,
  isDataLoading: true as boolean,
  isFavoritesLoading: true as boolean,
  isSendingError: false as boolean,
  isReviewSending: false as boolean,
  errorMessage: `` as string,
};

type InitialStateType = typeof initialState;

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
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
} as const;

export const ActionCreator = {
  loadMovies: (data: Array<Movie>) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: data,
    };
  },

  loadPromoMovie: (data: Movie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: data,
    };
  },

  loadFavoriteMovies: (data: Array<Movie>) => {
    return {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: data,
    };
  },

  loadMovieReviews: (data: Array<Review>) => {
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

  updateFavoriteStatus: (movie: Movie) => {
    return {
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: movie,
    };
  },

  setSendingErrorStatus: (status: boolean) => {
    return {
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: status,
    };
  },

  setReviewSendingStatus: (status: boolean) => {
    return {
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: status,
    };
  },

  setErrorMessage: (message: string) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: message,
    };
  },
};

export const Operation = {
  loadMovies: (): ThunkActionType => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      const loadedMovies = response.data.map((movie: MovieBackend) =>
        createMovie(movie),
      );
      dispatch(ActionCreator.loadMovies(loadedMovies));
      dispatch(ActionCreator.finishLoading());
    });
  },

  loadPromoMovie: (): ThunkActionType => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      const loadedPromo = createMovie(response.data);
      dispatch(ActionCreator.loadPromoMovie(loadedPromo));
    });
  },

  loadFavoriteMovies: (): ThunkActionType => (dispatch, getState, api) => {
    return api
      .get(`/favorite`)
      .then((response: AxiosResponse<Array<MovieBackend>>) => {
        const loadedMovies = response.data.map((movie) => createMovie(movie));
        dispatch(ActionCreator.loadFavoriteMovies(loadedMovies));
        dispatch(ActionCreator.finishFavoritesLoading());
      });
  },

  loadMovieReviews: (movieId: number): ThunkActionType => (
    dispatch,
    getState,
    api,
  ) => {
    return api
      .get(`/comments/${movieId}`)
      .then((response: AxiosResponse<Array<Review>>) => {
        const loadedComments = response.data.map((comment) => comment);
        dispatch(ActionCreator.loadMovieReviews(loadedComments));
      });
  },

  sendReview: (movieId: number, review: ReviewPure): ThunkActionType => (
    dispatch,
    getState,
    api,
  ) => {
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

  changeMovieFavoriteStatus: (
    movieId: number,
    isFavorite: boolean,
  ): ThunkActionType => (dispatch, getState, api) => {
    return api
      .post(`/favorite/${movieId}/${isFavorite ? 1 : 0}`, {})
      .then((response) => {
        dispatch(
          ActionCreator.updateFavoriteStatus(createMovie(response.data)),
        );
      })
      .catch((err) => {
        if (
          err.message !== "Request failed with status code 401" &&
          err.message !== "Network Error"
        ) {
          dispatch(ActionCreator.setErrorMessage(err.toJSON().message));
          history.push("/error");
        }
      });
  },
};

export const reducer = (
  state = initialState,
  action: UserActionTypes,
): InitialStateType => {
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
      return {
        ...state,
        movies: state.movies.map((item) =>
          item.id === action.payload.id ? action.payload : item,
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
    case ActionType.SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
