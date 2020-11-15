import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AddReview from "./add-review";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";
import history from "../../history";

describe(`Add Review tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let addReviewComponent = null;

  beforeEach(() => {
    store = mockStore({
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
    store.dispatch = jest.fn();
    addReviewComponent = renderer.create(
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
    );
  });

  it(`Render Add Review page`, () => {
    expect(addReviewComponent.toJSON()).toMatchSnapshot();
  });

  it(`Should call dispatch when form submit`, () => {
    const evt = { preventDefault: jest.fn() };
    renderer.act(() => {
      addReviewComponent.root.findByType(`form`).props.onSubmit(evt);
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
