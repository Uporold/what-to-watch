import React from "react";
import renderer from "react-test-renderer";
import MoviePageDetails from "./movie-page-details";
import { movies } from "../../mock/movies";

it(`Should Movie Page Details render correctly`, () => {
  const tree = renderer.create(<MoviePageDetails movie={movies[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
