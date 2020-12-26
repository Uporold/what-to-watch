import { useSelector } from "react-redux";
import { getActiveGenre } from "../selectors";

const useActiveGenre = () => {
  return useSelector(getActiveGenre);
};
