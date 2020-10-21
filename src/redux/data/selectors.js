import { createSelector } from "reselect";
import NameSpace from "../name-space";
import { getMoviesGenres, getMoviesByGenre } from "../../utilities/util";
import { getActiveGenre } from "../app/selectors";

export const getAllMovies = (state) => state[NameSpace.DATA].movies;
export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;
export const getMovieReviews = (state) => state[NameSpace.DATA].movieReviews;
export const getShowedMoviesCount = (state) =>
  state[NameSpace.DATA].showedMoviesCount;
export const getLoadingStatus = (state) => state[NameSpace.DATA].isDataLoading;

export const getAllGenres = createSelector(getAllMovies, (movies) =>
  getMoviesGenres(movies)
);

export const getFilteredMoviesByGenre = createSelector(
  getAllMovies,
  getActiveGenre,
  (movies, currentGenre) => getMoviesByGenre(movies, currentGenre)
);

export const getShowedMovies = createSelector(
  getFilteredMoviesByGenre,
  getShowedMoviesCount,
  (movies, count) => movies.slice(0, count)
);

export const getCurrentMovie = (id) =>
  createSelector(getAllMovies, (movies) =>
    movies.find((movie) => movie.id === Number(id))
  );
