import { useSelector } from "react-redux";
import { getActiveGenre } from "../selectors";

export const useActiveGenre = () => {
  return useSelector(getActiveGenre);
};
