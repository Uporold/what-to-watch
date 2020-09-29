import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./app";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    movies,
    moviesByGenre: movies,
    currentGenre: `All genres`,
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <App movies={movies} />
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
