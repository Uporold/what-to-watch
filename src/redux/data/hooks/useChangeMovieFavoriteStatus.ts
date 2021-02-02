import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useChangeMovieFavoriteStatus = (): ((
  movieId: number,
  isFavorite: boolean,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId, isFavorite) => {
      dispatch(Operation.changeMovieFavoriteStatus(movieId, isFavorite));
    },
    [dispatch],
  );
};
