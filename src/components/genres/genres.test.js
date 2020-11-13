import renderer from "react-test-renderer";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Genres from "./genres";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Should Genres List render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentGenre: `All genres`,
    },
    [NameSpace.DATA]: {
      movies,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Genres />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
