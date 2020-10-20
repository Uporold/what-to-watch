import React, { createRef, PureComponent } from "react";
import { connect } from "react-redux";
import { projectPropTypes } from "../../utilities/project-prop-types";
import { TIME_IN_SECONDS } from "../../utilities/const";
import history from "../../history";
import { getCurrentMovie } from "../../redux/data/selectors";

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

  onFullscreenClickHandler = () => {
    this.videoRef.current.requestFullscreen();
  };

  onExitButtonClickHandler = () => {
    history.goBack();
  };

  onButtonClickHandler = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });
  };

  getTimeLeft() {
    const { currentTime, duration } = this.state;
    const timeLeft = duration - currentTime;

    const formatTime = (time) => {
      return time < 10 ? `0${time}` : time;
    };

    const minutes = formatTime(Math.floor(timeLeft / TIME_IN_SECONDS.MINUTE));
    const seconds = formatTime(Math.floor(timeLeft % TIME_IN_SECONDS.MINUTE));
    const hours = formatTime(Math.floor(timeLeft / TIME_IN_SECONDS.HOUR));

    return hours > 1
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  }

  renderPlayButton() {
    return (
      <button
        onClick={this.onButtonClickHandler}
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
        onClick={this.onButtonClickHandler}
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
        onClick={this.onFullscreenClickHandler}
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
    const { isPlaying, duration, currentTime } = this.state;
    const { movie } = this.props;
    const togglePosition = (currentTime / duration) * 100;
    return (
      <div className="player">
        <video ref={this.videoRef} className="player__video" />

        <button
          onClick={this.onExitButtonClickHandler}
          type="button"
          className="player__exit"
        >
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={currentTime}
                max={duration}
              />
              <div
                className="player__toggler"
                style={{ left: `${togglePosition}%` }}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">{this.getTimeLeft()}</div>
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

const mapStateToProps = (state, { match: { params } }) => ({
  movie: getCurrentMovie(params.id)(state),
});

export { VideoPlayer };
export default connect(mapStateToProps)(VideoPlayer);
