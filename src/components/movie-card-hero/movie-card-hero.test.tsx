import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MovieCardHero from "./movie-card-hero";
import { movies } from "../../mock/movies";

describe(`Movie Card Hero tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let movieCardHeroComponent = null;

  beforeEach(() => {
    store = mockStore({
      USER: {
        authorizationStatus: false,
      },
    });

    store.dispatch = jest.fn();

    movieCardHeroComponent = renderer.create(
      <Router>
        <Provider store={store}>
          <MovieCardHero movie={movies[0]} />
        </Provider>
      </Router>,
    );
  });

  it(`Movie Card Hero component render correctly`, () => {
    expect(movieCardHeroComponent.toJSON()).toMatchSnapshot();
  });

  // it(`Should call dispatch when button click`, () => {
  //   renderer.act(() => {
  //     movieCardHeroComponent.root.findByType(`button`).props.onClick();
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });
});
