import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useSendReview = () => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId, review) => {
      dispatch(Operation.sendReview(movieId, review));
    },
    [dispatch]
  );
};
