import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MoviePromoCard from "./movie-promo-card";
import { movies } from "../../mock/movies";

describe(`Movie Promo Card tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let moviePromoCardComponent = null;

  beforeEach(() => {
    store = mockStore({
      DATA: {
        promoMovie: movies[0],
      },
      USER: {
        authorizationStatus: false,
      },
    });

    store.dispatch = jest.fn();

    moviePromoCardComponent = renderer.create(
      <Router>
        <Provider store={store}>
          <MoviePromoCard />
        </Provider>
      </Router>,
    );
  });

  it(`Movie Promo Card component render correctly`, () => {
    expect(moviePromoCardComponent.toJSON()).toMatchSnapshot();
  });

  // it(`Should call dispatch when button click`, () => {
  //   renderer.act(() => {
  //     moviePromoCardComponent.root.findByType(`button`).props.onClick();
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });
});
