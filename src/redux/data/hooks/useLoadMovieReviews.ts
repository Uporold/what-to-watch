import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadMovieReviews = (): ((movieId: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId) => {
      dispatch(Operation.loadMovieReviews(movieId));
    },
    [dispatch],
  );
};
