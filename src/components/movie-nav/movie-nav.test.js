import React from "react";
import renderer from "react-test-renderer";
import MovieNav from "./movie-nav";
import { movieNavs } from "../../utilities/util";

const currentNav = `overview`;

it(`Should Movie Nav render correctly`, () => {
  const tree = renderer
    .create(
      <MovieNav
        currentNav={currentNav}
        onNavClick={() => {}}
        tabs={movieNavs}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
