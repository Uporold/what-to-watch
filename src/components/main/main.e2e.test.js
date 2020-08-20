import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import { fakeMoviesList } from "../../mock";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title button be pressed`, () => {
  const onMovieTitleClick = jest.fn();

  const main = shallow(
    <Main movies={fakeMoviesList} onMovieTitleClick={onMovieTitleClick} />
  );

  const movieTitleButtons = main.find(`.small-movie-card__title`);

  movieTitleButtons.forEach((movieTitleButton) => {
    movieTitleButton.props().onClick();
  });

  expect(onMovieTitleClick.mock.calls.length).toBe(fakeMoviesList.length);
});
