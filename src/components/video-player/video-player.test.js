import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import VideoPlayer from "./video-player";
import NameSpace from "../../redux/name-space";
import { movies } from "../../mock/movies";

const mockStore = configureStore([]);

it(`VideoPlayer component render`, () => {
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
          <VideoPlayer match={{ params: { id: 1 } }} />
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
