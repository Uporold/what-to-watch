import React from "react";
import renderer from "react-test-renderer";
import MoviePageReviews from "./movie-page-reviews";
import { movies } from "../../mock/movies";

it(`Should Movie Page Overview render correctly`, () => {
  const tree = renderer.create(<MoviePageReviews movie={movies[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
