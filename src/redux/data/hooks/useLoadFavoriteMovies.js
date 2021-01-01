import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useLoadFavoriteMovies = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(Operation.loadFavoriteMovies());
  }, [dispatch]);
};
