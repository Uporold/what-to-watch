import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { movies } from "../../mock/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title button be pressed`, () => {
  const onSmallCardMovieClick = jest.fn();
  const evt = { preventDefault: jest.fn };

  const main = mount(
    <Router>
      <Main movies={movies} onSmallCardMovieClick={onSmallCardMovieClick} />
    </Router>
  );

  const movieTitleButtons = main.find(`.small-movie-card`);

  movieTitleButtons.forEach((movieTitleButton) => {
    movieTitleButton.props().onClick(evt);
  });

  expect(onSmallCardMovieClick.mock.calls.length).toBe(movies.length);
});
