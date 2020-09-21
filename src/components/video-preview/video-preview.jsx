import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";

class VideoPreview extends PureComponent {
  constructor(props) {
    super(props);

    this._videoPreviewRef = createRef();
    this._previewPlayTimeout = null;
  }

  componentDidMount() {
    const { source, isMuted, poster } = this.props;
    const video = this._videoPreviewRef.current;

    video.src = source;
    video.muted = isMuted;
    video.poster = poster;
  }

  componentDidUpdate() {
    const video = this._videoPreviewRef.current;

    if (this.props.isPlaying) {
      this._previewPlayTimeout = setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.load();
      clearTimeout(this._previewPlayTimeout);
    }
  }

  componentWillUnmount() {
    const video = this._videoPreviewRef.current;

    video.src = ``;
    video.muted = null;
    video.poster = ``;

    clearTimeout(this._previewPlayTimeout);
  }

  render() {
    return <video width="280" height="175" ref={this._videoPreviewRef} />;
  }
}

VideoPreview.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPreview;
