import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import { fakeMoviesList } from "../../mock";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer.create(<Main movies={fakeMoviesList} />).toJSON();

  expect(tree).toMatchSnapshot();
});
