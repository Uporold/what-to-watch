import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Main from "./main";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentGenre: `All genres`,
    },
    [NameSpace.DATA]: {
      movies,
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
          <Main />
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
