import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPreview from "./video-preview";
import { movies } from "../../mock/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Play and pause work`, () => {
  const isPlaying = true;
  const { previewVideoLink, previewImage } = movies[0];
  window.HTMLMediaElement.prototype.load = () => {};

  const videoPreview = mount(
    <VideoPreview
      isMuted
      isPlaying={isPlaying}
      poster={previewImage}
      source={previewVideoLink}
    />
  );

  expect(videoPreview.props().isPlaying).toBe(true);
  videoPreview.setProps({ isPlaying: false });
  expect(videoPreview.props().isPlaying).toBe(false);
});
