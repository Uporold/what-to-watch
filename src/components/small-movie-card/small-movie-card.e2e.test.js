import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";
import { movies } from "../../mock/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hovered`, () => {
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
    <SmallMovieCard
      onSmallCardMovieClick={() => {}}
      movie={movies[0]}
      onHover={onCardHover}
    />
  );

  const card = smallMovieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`, movies[0]);
  expect(onCardHover.mock.calls.length).toBe(1);
  expect(onCardHover.mock.calls[0][0]).toMatchObject(movies[0]);
});
