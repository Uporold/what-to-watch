import renderer from "react-test-renderer";
import React from "react";
import Genres from "./genres";
import { movies } from "../../mock/movies";
import { getMoviesGenres } from "../../utilities/util";

const currentGenre = `All genres`;
const genres = getMoviesGenres(movies);

it(`Should Genres List render correctly`, () => {
  const tree = renderer
    .create(
      <Genres
        currentGenre={currentGenre}
        onGenreClick={() => {}}
        genres={genres}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
