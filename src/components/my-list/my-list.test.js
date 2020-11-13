import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MyList from "./my-list";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";

const mockStore = configureStore([]);

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

it(`Favorites page component render`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteMovies: movies,
      isFavoritesLoading: false,
    },
    [NameSpace.USER]: {
      authorizationStatus: true,
      user: userData,
    },
  });

  store.dispatch = jest.fn();

  const tree = renderer
    .create(
      <Router>
        <Provider store={store}>
          <MyList />
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
