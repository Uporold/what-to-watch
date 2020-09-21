import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import { movies } from "../../mock/movies";

it(`Render App`, () => {
  const tree = renderer
    .create(<App movies={movies} />, {
      createNodeMock: () => {
        return {};
      },
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
