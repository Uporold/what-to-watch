import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ActionCreator } from "../data";

export const useShowMoreMovies = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.showMoreMovies());
  }, [dispatch]);
};
