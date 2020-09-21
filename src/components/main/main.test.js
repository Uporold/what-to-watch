import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { movies } from "../../mock/movies";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <Main movies={movies} onSmallCardMovieClick={() => {}} />
      </Router>,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
