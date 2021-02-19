import React from "react";
import renderer from "react-test-renderer";
import { Router } from "react-router-dom";
import Breadcrumbs from "./breadcrumbs";
import { movies } from "../../mock/movies";
import history from "../../history";

it(`Breadcrumbs component render correctly`, () => {
  const tree = renderer
    .create(
      <Router history={history}>
        <Breadcrumbs movie={movies[0]} />
      </Router>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
