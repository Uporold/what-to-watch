import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MoviePageReviews from "./movie-page-reviews";
import { reviews } from "../../mock/reviews";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Movie Page Reviews render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movieReviews: reviews,
    },
  });

  store.dispatch = jest.fn();

  const tree = renderer
    .create(
      <Provider store={store}>
        <MoviePageReviews movie={movies[0]} />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
