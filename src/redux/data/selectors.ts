import { createSelector } from "reselect";
import { getMoviesGenres, getMoviesByGenre } from "../../utilities/util";
import { getActiveGenre } from "../app/selectors";
import { GlobalState } from "../reducer";

export const getAllMovies = (state: GlobalState) =>
  state.DATA.movies;
export const getPromoMovie = (state: GlobalState) =>
  state.DATA.promoMovie;
export const getFavoriteMovies = (state: GlobalState) =>
  state.DATA.favoriteMovies;
export const getMovieReviews = (state: GlobalState) =>
  state.DATA.movieReviews;
export const getShowedMoviesCount = (state: GlobalState) =>
  state.DATA.showedMoviesCount;
export const getLoadingStatus = (state: GlobalState) =>
  state.DATA.isDataLoading;
export const getFavoritesLoadingStatus = (state: GlobalState) =>
  state.DATA.isFavoritesLoading;
export const getSendingErrorStatus = (state: GlobalState) =>
  state.DATA.isSendingError;
export const getReviewSendingStatus = (state: GlobalState) =>
  state.DATA.isReviewSending;
export const getErrorMessage = (state: GlobalState) =>
  state.DATA.errorMessage;

export const getAllGenres = createSelector(getAllMovies, (movies) =>
  getMoviesGenres(movies),
);

export const getFilteredMoviesByGenre = createSelector(
  getAllMovies,
  getActiveGenre,
  (movies, currentGenre) => getMoviesByGenre(movies, currentGenre),
);

export const getShowedMovies = createSelector(
  getFilteredMoviesByGenre,
  getShowedMoviesCount,
  (movies, count) => movies.slice(0, count),
);

export const getCurrentMovie = (id: number) =>
  createSelector(getAllMovies, (movies) =>
    movies.find((movie) => movie.id === Number(id)),
  );
