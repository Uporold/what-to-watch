import { reducer, ActionCreator, ActionType } from "./app";
import { DEFAULT_GENRE } from "../../utilities/const";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    currentGenre: DEFAULT_GENRE,
  });
});

it(`Reducer should change current genre by a given value`, () => {
  expect(
    reducer(
      {
        currentGenre: DEFAULT_GENRE,
      },
      {
        type: ActionType.SET_GENRE,
        payload: `Comedy`,
      }
    )
  ).toEqual({
    currentGenre: `Comedy`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set genre returns correct action`, () => {
    expect(ActionCreator.setGenre(`Comedy`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    });
  });
});
