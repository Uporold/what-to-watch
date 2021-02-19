import React from "react";
import renderer from "react-test-renderer";
import { movies } from "../../mock/movies";
import VideoPreview from "./video-preview";

it(`VideoPreview is rendered correctly`, () => {
  const { previewVideoLink, previewImage } = movies[0];

  const tree = renderer
    .create(
      <VideoPreview
        isMuted
        poster={previewImage}
        source={previewVideoLink}
        isPlaying={false}
      />,
      {
        createNodeMock: () => {
          return {};
        },
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
