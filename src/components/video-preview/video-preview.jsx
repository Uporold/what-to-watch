import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const VideoPreview = ({ isPlaying, isMuted, source, poster }) => {
  const videoPreviewRef = useRef();
  const previewPlayTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoPreviewRef.current;
    video.src = source;
    video.muted = isMuted;
    video.poster = poster;

    return () => {
      video.src = ``;
      video.muted = null;
      video.poster = ``;

      clearTimeout(previewPlayTimeoutRef.current);
    };
  }, [isMuted, poster, source]);

  useEffect(() => {
    const video = videoPreviewRef.current;

    if (isPlaying) {
      previewPlayTimeoutRef.current = setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.load();
      clearTimeout(previewPlayTimeoutRef.current);
    }
  });

  return <video width="280" height="175" ref={videoPreviewRef} />;
};

VideoPreview.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPreview;
