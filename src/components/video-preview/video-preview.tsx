import React, { useRef, useEffect } from "react";

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  source: string;
  poster: string;
}

const VideoPreview: React.FC<Props> = ({
  isPlaying,
  isMuted,
  source,
  poster,
}): JSX.Element => {
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const previewPlayTimeoutRef = useRef(0);

  useEffect(() => {
    const video = videoPreviewRef.current;
    if (video !== null) {
      video.src = source;
      video.muted = isMuted;
      video.poster = poster;

      return () => {
        video.src = ``;
        video.muted = isMuted;
        video.poster = ``;

        clearTimeout(previewPlayTimeoutRef.current);
      };
    }
    return () => null;
  }, [isMuted, poster, source]);

  useEffect(() => {
    const video = videoPreviewRef.current;
    if (video !== null) {
      if (isPlaying) {
        previewPlayTimeoutRef.current = window.setTimeout(() => {
          video.play().then(() => console.log("video played auto"));
        }, 1000);
      } else {
        video.load();
        clearTimeout(previewPlayTimeoutRef.current);
      }
    }
  });

  return <video width="280" height="175" ref={videoPreviewRef} />;
};

export default VideoPreview;
