import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MoviePromoCard from "./movie-promo-card";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Movie Promo Card component render`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      promoMovie: movies[0],
    },
    [NameSpace.USER]: {
      authorizationStatus: false,
    },
  });

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <MoviePromoCard />
        </Provider>
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
