import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import { movies } from "../../mock/mock";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title button be pressed`, () => {
  const onSmallCardMovieClick = jest.fn();
  const evt = { preventDefault: jest.fn };

  const main = mount(
    <Main movies={movies} onSmallCardMovieClick={onSmallCardMovieClick} />
  );

  const movieTitleButtons = main.find(`.small-movie-card`);

  movieTitleButtons.forEach((movieTitleButton) => {
    movieTitleButton.props().onClick(evt);
  });

  expect(onSmallCardMovieClick.mock.calls.length).toBe(movies.length);
});
