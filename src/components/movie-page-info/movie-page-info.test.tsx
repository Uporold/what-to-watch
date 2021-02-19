import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MoviePageInfo from "./movie-page-info";
import { movies } from "../../mock/movies";
import { reviews } from "../../mock/reviews";

const mockStore = configureStore([]);

it(`Should Movie Page Info render correctly`, () => {
  const store = mockStore({
    DATA: {
      movies,
      movieReviews: reviews,
    },
    USER: {
      authorizationStatus: false,
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <MoviePageInfo movie={movies[0]} />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
