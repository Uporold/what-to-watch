import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";
import { movies } from "../../mock/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should video preview play and pause on mouse actions`, () => {
  const smallMovieCard = shallow(
    <SmallMovieCard onSmallCardMovieClick={() => {}} movie={movies[0]} />
  );

  const card = smallMovieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`);
  expect(smallMovieCard.state().isPlaying).toBe(true);

  card.simulate(`mouseleave`);
  expect(smallMovieCard.state().isPlaying).toBe(false);
});
