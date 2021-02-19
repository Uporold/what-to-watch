import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MoviePageReviews from "./movie-page-reviews";
import { reviews } from "../../mock/reviews";

const mockStore = configureStore([]);

it(`Should Movie Page Reviews render correctly`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: false,
    },
  });


  const tree = renderer
    .create(
      <Provider store={store}>
        <MoviePageReviews
          slicedReviews={[[reviews[1]], [reviews[2]]]}
        />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
