import React from "react";
import renderer from "react-test-renderer";
import MoviePageOverview from "./movie-page-overview";
import { movies } from "../../mock/movies";

it(`Should Movie Page Overview render correctly`, () => {
  const tree = renderer
    .create(<MoviePageOverview movie={movies[0]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
