import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "./sign-in";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

it(`Sign in page component render`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
    },
  });

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <SignIn />
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
