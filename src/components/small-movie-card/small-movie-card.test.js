import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import SmallMovieCard from "./small-movie-card";
import { movies } from "../../mock/movies";

it(`Should Movie Card render correctly`, () => {
  const tree = renderer
    .create(
      <Router>
        <SmallMovieCard
          onSmallCardMovieClick={() => {}}
          movie={movies[0]}
          onHover={() => {}}
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
