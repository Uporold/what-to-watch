import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";
import { movies } from "../../mock/mock";

it(`Should Movies List render correctly`, () => {
  const tree = renderer
    .create(
      <SmallMovieCard
        onSmallCardMovieClick={() => {}}
        movie={movies[0]}
        onHover={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
