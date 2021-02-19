import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import MoviesList from "./movies-list";
import { movies } from "../../mock/movies";

it(`Should Movies List render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <MoviesList movies={movies} />
      </Router>,
      {
        createNodeMock: () => {
          return {};
        },
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
