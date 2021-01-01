import { useSelector } from "react-redux";
import {
  getAllMovies,
  getReviewSendingStatus,
  getFavoriteMovies,
  getLoadingStatus,
  getCurrentMovie,
  getMovieReviews,
  getPromoMovie,
  getAllGenres,
  getShowedMovies,
  getFilteredMoviesByGenre,
  getFavoritesLoadingStatus,
  getSendingErrorStatus,
  getShowedMoviesCount, getErrorMessage,
} from "../selectors";

export const useAllMovies = () => {
  return useSelector(getAllMovies);
};

export const usePromoMovie = () => {
  return useSelector(getPromoMovie);
};

export const useFavoriteMovies = () => {
  return useSelector(getFavoriteMovies);
};

export const useMovieReviews = () => {
  return useSelector(getMovieReviews);
};

export const useShovedMoviesCount = () => {
  return useSelector(getShowedMoviesCount);
};

export const useDataLoadingStatus = () => {
  return useSelector(getLoadingStatus);
};

export const useFavoritesLoadingStatus = () => {
  return useSelector(getFavoritesLoadingStatus);
};

export const useSendingErrorStatus = () => {
  return useSelector(getSendingErrorStatus);
};

export const useReviewSendingStatus = () => {
  return useSelector(getReviewSendingStatus);
};

export const useAllGenres = () => {
  return useSelector(getAllGenres);
};

export const useFilteredMoviesByGenre = () => {
  return useSelector(getFilteredMoviesByGenre);
};

export const useShowedMovies = () => {
  return useSelector(getShowedMovies);
};

export const useCurrentMovie = (id) => {
  return useSelector(getCurrentMovie(id));
};

export const useErrorMessage = () => {
  return useSelector(getErrorMessage);
}
