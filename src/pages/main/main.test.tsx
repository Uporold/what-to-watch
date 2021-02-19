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
    APP: {
      currentGenre: `All genres`,
    },
    DATA: {
      movies,
      promoMovie: movies[0],
    },
    USER: {
      authorizationStatus: false,
    },
  });

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <Main />
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
