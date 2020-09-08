import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import { movies } from "../../mock/mock";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main movies={movies} onSmallCardMovieClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
