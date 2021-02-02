import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";
import { ReviewPure } from "../../../utilities/types";

export const useSendReview = (): ((
  movieId: number,
  review: ReviewPure,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (movieId, review) => {
      dispatch(Operation.sendReview(movieId, review));
    },
    [dispatch],
  );
};
