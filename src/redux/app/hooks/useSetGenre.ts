import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetGenre = (): ((genre: string) => void) => {
  const dispatch = useDispatch();
  return useCallback(
    (genre) => {
      dispatch(ActionCreator.setGenre(genre));
    },
    [dispatch],
  );
};
