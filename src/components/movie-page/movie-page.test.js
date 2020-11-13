import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MoviePage from "./movie-page";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Movie Page render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies,
    },
    [NameSpace.USER]: {
      authorizationStatus: false,
    },
  });
  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <MoviePage match={{ params: { id: 1 } }} />
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
