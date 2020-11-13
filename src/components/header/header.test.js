import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Header from "./header";
import { movies } from "../../mock/movies";
import NameSpace from "../../redux/name-space";
import history from "../../history";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";

const mockStore = configureStore([]);

const userData = {
  id: 1,
  email: `test@gmail.com`,
  name: `test`,
  avatar: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/4.jpg`,
};

describe(`Header tests`, () => {
  it(`Render Header on Main Page or Movie Page without login`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: false,
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Header />
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header on Main Page or Movie Page with login`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: true,
        user: userData,
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Header />
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header on Review Page`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: true,
        user: userData,
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Header>
              <Breadcrumbs movie={movies[0]} />
            </Header>
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header on Favorites Page`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: true,
        user: userData,
      },
      [NameSpace.DATA]: {
        favoriteMovies: movies,
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Header isFavoritesPage />
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render Header on Login Page`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: false,
      },
    });

    const tree = renderer
      .create(
        <Router history={history}>
          <Provider store={store}>
            <Header isLoginPage />
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
