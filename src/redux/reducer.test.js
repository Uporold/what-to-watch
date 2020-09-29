import { initialState, ActionType, reducer } from "./reducer";
import { movies } from "../mock/movies";
import { getMoviesByGenre } from "../utilities/util";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should return right active genre`, () => {
  expect(
    reducer(
      {
        currentGenre: `All genres`,
      },
      {
        type: ActionType.SET_GENRE,
        payload: `Crime`,
      }
    )
  ).toEqual({
    currentGenre: `Crime`,
  });
});

it(`Reducer should return right genre films`, () => {
  expect(
    reducer(
      {
        currentGenre: `All genres`,
        moviesByGenre: movies,
      },
      {
        type: ActionType.GET_MOVIES_BY_GENRE,
        payload: getMoviesByGenre(movies, `Crime`),
      }
    )
  ).toEqual({
    currentGenre: `All genres`,
    moviesByGenre: getMoviesByGenre(movies, `Crime`),
  });
});
