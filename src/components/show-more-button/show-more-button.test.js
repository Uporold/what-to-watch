import renderer from "react-test-renderer";
import React from "react";
import ShowMoreButton from "./show-more-button";

it(`Should Genres List render correctly`, () => {
  const tree = renderer
    .create(<ShowMoreButton onShowMoreButtonClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
