import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AddReview from "./add-review";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";
import history from "../../history";

const mockStore = configureStore([]);

it(`Render Add Review page`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
      isAuthorizationLoading: false,
    },
    [NameSpace.DATA]: {
      movies,
      isSendingError: false,
      isReviewSending: false,
    },
  });

  const tree = renderer
    .create(
      <Router history={history}>
        <Provider store={store}>
          <AddReview routeProps={{ match: { params: { id: 1 } } }} />
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
