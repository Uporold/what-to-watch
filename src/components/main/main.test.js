import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Main from "./main";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    movies,
    moviesByGenre: movies,
    currentGenre: `All genres`,
  });
  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <Main movies={movies} onSmallCardMovieClick={() => {}} />
        </Provider>
      </Router>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
