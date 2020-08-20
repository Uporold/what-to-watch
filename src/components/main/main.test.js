import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import { fakeMoviesList } from "../../mock";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main movies={fakeMoviesList} onMovieTitleClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
