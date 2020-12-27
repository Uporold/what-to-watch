import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

const useSetGenre = () => {
  const dispatch = useDispatch();
  return useCallback(
    (genre) => {
      dispatch(ActionCreator.setGenre(genre));
    },
    [dispatch]
  );
};