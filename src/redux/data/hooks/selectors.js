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
  getShowedMoviesCount,
} from "../selectors";

const useAllMovies = () => {
  return useSelector(getAllMovies);
};

const usePromoMovie = () => {
  return useSelector(getPromoMovie);
};

const useFavoriteMovies = () => {
  return useSelector(getFavoriteMovies);
};

const useMovieReviews = () => {
  return useSelector(getMovieReviews);
};

const useShovedMoviesCount = () => {
  return useSelector(getShowedMoviesCount);
};

const useDataLoadingStatus = () => {
  return useSelector(getLoadingStatus);
};

const useFavoritesLoadingStatus = () => {
  return useSelector(getFavoritesLoadingStatus);
};

const useSendingErrorStatus = () => {
  return useSelector(getSendingErrorStatus);
};

const useReviewSendingStatus = () => {
  return useSelector(getReviewSendingStatus);
};

const useAllGenres = () => {
  return useSelector(getAllGenres);
};

const useFilteredMoviesByGenre = () => {
  return useSelector(getFilteredMoviesByGenre);
};

const useShowedMovies = () => {
  return useSelector(getShowedMovies);
};

const useCurrentMovie = (id) => {
  return useSelector(getCurrentMovie(id));
};
