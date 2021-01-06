import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useChangeMovieFavoriteStatus = () => {
  const dispatch = useDispatch();

  return useCallback(
    (hotelId, isFavorite) => {
      dispatch(Operation.changeMovieFavoriteStatus(hotelId, isFavorite));
    },
    [dispatch]
  );
};
