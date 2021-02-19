import renderer from "react-test-renderer";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Genres from "./genres";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`Should Genres List render correctly`, () => {
  const store = mockStore({
    DATA: {
      movies,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
        <Genres  currentGenre={`All genres`}/>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
