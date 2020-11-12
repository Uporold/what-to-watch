import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./app";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentGenre: `All genres`,
    },
    [NameSpace.USER]: {
      authorizationStatus: false,
      isAuthorizationLoading: false,
    },
    [NameSpace.DATA]: {
      isDataLoading: false,
      movies,
      promoMovie: movies[0],
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
