import React, { createRef, PureComponent } from "react";
import { projectPropTypes } from "../../utilities/project-prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.videoRef = createRef();

    this.state = {
      isPlaying: true,
      duration: null,
      currentTime: null,
    };
  }

  componentDidMount() {
    const { videoLink, backgroundImage } = this.props.movie;
    const video = this.videoRef.current;
    video.play();

    video.src = videoLink;
    video.poster = backgroundImage;

    video.onloadedmetadata = () =>
      this.setState({
        duration: video.duration,
      });

    video.ontimeupdate = () =>
      this.setState({
        currentTime: Math.floor(video.currentTime),
      });
  }

  componentDidUpdate() {
    const video = this.videoRef.current;
    const { isPlaying } = this.state;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    video.src = ``;
    video.poster = ``;
    video.onloadedmetadata = null;
    video.ontimeupdate = null;
  }

  onButtonClickHandler() {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });
  }

  onFullscreenClickHandler() {
    this.videoRef.current.requestFullscreen();
  }

  renderPlayButton() {
    return (
      <button
        onClick={() => {
          this.onButtonClickHandler();
        }}
        type="button"
        className="player__play"
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
    );
  }

  renderPauseButton() {
    return (
      <button
        onClick={() => {
          this.onButtonClickHandler();
        }}
        type="button"
        className="player__play"
      >
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause" />
        </svg>
        <span>Pause</span>
      </button>
    );
  }

  renderFullscreenButton() {
    return (
      <button
        onClick={() => {
          this.onFullscreenClickHandler();
        }}
        type="button"
        className="player__full-screen"
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <use xlinkHref="#full-screen" />
        </svg>
        <span>Full screen</span>
      </button>
    );
  }

  render() {
    const { isPlaying, duration } = this.state;
    const { movie } = this.props;
    return (
      <div className="player">
        <video ref={this.videoRef} className="player__video" />

        <button type="button" className="player__exit">
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100" />
              <div className="player__toggler" style={{ left: "30%" }}>
                Toggler
              </div>
            </div>
            <div className="player__time-value">{duration}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ? this.renderPauseButton() : this.renderPlayButton()}
            <div className="player__name">{movie.name}</div>

            {this.renderFullscreenButton()}
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default VideoPlayer;
