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

it(`Reducer should show more button increase movies count correctly`, () => {
  expect(
    reducer(
      {
        showedMoviesCount: 2,
      },
      {
        type: ActionType.SHOW_MORE_MOVIES,
        payload: 2,
      }
    )
  ).toEqual({
    showedMoviesCount: 4,
  });
});

it(`Reducer should reset movies count correctly`, () => {
  expect(
    reducer(
      {
        showedMoviesCount: 2,
      },
      {
        type: ActionType.SET_DEFAULT_MOVIES_COUNT,
        payload: 2,
      }
    )
  ).toEqual({
    showedMoviesCount: 2,
  });
});
