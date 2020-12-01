import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Genres } from "./genres";

configure({ adapter: new Adapter() });

const genres = [`All genres`, `Comedy`, `Horror`];

it(`Should Genres items clicked`, () => {
  const onGenreClick = jest.fn();

  const wrapper = shallow(
    <Genres
      currentGenre="All genres"
      genres={genres}
      onGenreClick={onGenreClick}
    />
  );

  const targetGenreButtonComedy = wrapper.find(`a.catalog__genres-link`).at(1);
  targetGenreButtonComedy.simulate(`click`, {
    preventDefault: jest.fn(),
  });

  const targetGenreButtonHorror = wrapper.find(`a.catalog__genres-link`).at(2);
  targetGenreButtonHorror.simulate(`click`, {
    preventDefault: jest.fn(),
  });

  expect(onGenreClick.mock.calls.length).toBe(2);
  expect(onGenreClick.mock.calls[0][0]).toBe(`Comedy`);
  expect(onGenreClick.mock.calls[1][0]).toBe(`Horror`);
});
