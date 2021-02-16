import { GlobalState } from "../reducer";

export const getActiveGenre = (state: GlobalState) => state.APP.currentGenre;
