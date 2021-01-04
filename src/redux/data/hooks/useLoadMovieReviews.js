import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadMovieReviews = () => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId) => {
      dispatch(Operation.loadMovieReviews(movieId));
    },
    [dispatch]
  );
};
