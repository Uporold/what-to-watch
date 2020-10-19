import { createSelector } from "reselect";
import NameSpace from "../name-space";

export const getActiveGenre = (state) => state[NameSpace.APP].currentGenre;
