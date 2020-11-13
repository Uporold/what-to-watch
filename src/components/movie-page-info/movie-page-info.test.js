import React from "react";
import renderer from "react-test-renderer";
import MoviePageInfo from "./movie-page-info";
import { movies } from "../../mock/movies";

it(`Should Movie Page Info render correctly`, () => {
  const tree = renderer.create(<MoviePageInfo movie={movies[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
