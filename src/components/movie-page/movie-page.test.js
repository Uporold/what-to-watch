import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page";
import { movies } from "../../mock/mock";

it(`Should Movie Page render correctly`, () => {
  const tree = renderer.create(<MoviePage movie={movies[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
