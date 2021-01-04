import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../data";

export const useSetDefaultMoviesCount = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.setDefaultMoviesCount());
  }, [dispatch]);
};
