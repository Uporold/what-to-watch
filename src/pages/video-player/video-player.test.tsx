import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import VideoPlayer from "./video-player";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`VideoPlayer component render`, () => {
  const store = mockStore({
    DATA: {
      movies,
    },
    USER: {
      authorizationStatus: false,
    },
  });

  const tree = renderer
    .create(
      <Provider store={store}>
      <Router>
          {/* @ts-ignore */}
          <VideoPlayer match={{ params: { id: `1` } }} />
      </Router>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
