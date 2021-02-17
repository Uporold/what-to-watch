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
  getErrorMessage,
} from "../selectors";
import { Movie, Review } from "../../../utilities/types";

export const useAllMovies = (): Array<Movie> => {
  return useSelector(getAllMovies);
};

export const usePromoMovie = (): Movie => {
  return useSelector(getPromoMovie);
};

export const useFavoriteMovies = (): Array<Movie> => {
  return useSelector(getFavoriteMovies);
};

export const useMovieReviews = (): Array<Review> => {
  return useSelector(getMovieReviews);
};

export const useDataLoadingStatus = (): boolean => {
  return useSelector(getLoadingStatus);
};

export const useFavoritesLoadingStatus = (): boolean => {
  return useSelector(getFavoritesLoadingStatus);
};

export const useSendingErrorStatus = (): boolean => {
  return useSelector(getSendingErrorStatus);
};

export const useReviewSendingStatus = (): boolean => {
  return useSelector(getReviewSendingStatus);
};

export const useAllGenres = (): Array<string> => {
  return useSelector(getAllGenres);
};

export const useFilteredMoviesByGenre = (): Array<Movie> => {
  return useSelector(getFilteredMoviesByGenre);
};

export const useShowedMovies = (): Array<Movie> => {
  return useSelector(getShowedMovies);
};

export const useCurrentMovie = (id: number): Movie => {
  return useSelector(getCurrentMovie(id)) as Movie;
};

export const useErrorMessage = (): string => {
  return useSelector(getErrorMessage);
};
