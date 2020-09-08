import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list";
import { movies } from "../../mock/mock";

it(`Should Movies List render correctly`, () => {
  const tree = renderer
    .create(<MoviesList movies={movies} onSmallCardMovieClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
