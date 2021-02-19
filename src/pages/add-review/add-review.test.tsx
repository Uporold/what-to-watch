import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import AddReview from "./add-review";
import { movies } from "../../mock/movies";
import history from "../../history";
import thunk from "redux-thunk";

describe(`Add Review tests`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let addReviewComponent = null;

  beforeEach(() => {
    store = mockStore({
      USER: {
        authorizationStatus: false,
        isAuthorizationLoading: false,
      },
      DATA: {
        movies,
        isSendingError: false,
        isReviewSending: false,
      },
    });

    addReviewComponent = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          {/* @ts-ignore */}
          <AddReview routeProps={{ match: { params: { id: `1` } } }} />
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

  // it(`Should call dispatch when form submit`, () => {
  //   const evt = { preventDefault: jest.fn() };
  //   renderer.act(() => {
  //     addReviewComponent.root.findByType(`form`).props.onSubmit(evt);
  //   });
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  // });
});
