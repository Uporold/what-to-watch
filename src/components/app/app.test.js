import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import { fakeMoviesList } from "../../mock";

it(`Render App`, () => {
  const tree = renderer.create(<App movies={fakeMoviesList} />).toJSON();

  expect(tree).toMatchSnapshot();
});
