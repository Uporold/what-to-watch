import { useSelector } from "react-redux";
import { getActiveGenre } from "../selectors";

export const useActiveGenre = (): string => {
  return useSelector(getActiveGenre);
};
