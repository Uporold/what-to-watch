import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MovieCardHero from "./movie-card-hero";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Movie Card Hero component render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
    },
  });

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <MovieCardHero movie={movies[0]} />
        </Provider>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
