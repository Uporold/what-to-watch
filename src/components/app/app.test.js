import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import { movies } from "../../mock/mock";

it(`Render App`, () => {
  const tree = renderer.create(<App movies={movies} />).toJSON();

  expect(tree).toMatchSnapshot();
});
