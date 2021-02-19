import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import Catalog from "./catalog";
import NameSpace from "../../redux/name-space";
import history from "../../history";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`Should render correctly`, () => {
  const store = mockStore({
    APP: {
      currentGenre: `All genres`,
    },
    DATA: {
      movies,
    },
  });

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </Router>,
      {
        createNodeMock: () => {
          return {};
        },
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
