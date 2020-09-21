import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import MoviePage from "./movie-page";
import { movies } from "../../mock/movies";

it(`Should Movie Page render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <MoviePage
          movie={movies[0]}
          movies={movies}
          onSmallCardMovieClick={() => {}}
        />
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
