import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import { TIME_IN_SECONDS } from "../../utilities/const";
import history from "../../history";
import { useCurrentMovie } from "../../redux/data/hooks/selectors";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

const VideoPlayer: React.FC<Props> = ({ match }): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const movieId = Number(match.params.id);
  const movie = useCurrentMovie(movieId);

  const [isPlaying, setPlayStatus] = useState(true);
  const [duration, changeDuration] = useState<number>(0);
  const [currentTime, setTime] = useState<number>(0);

  const togglePosition = (currentTime / duration) * 100;

  // componentDidMount
  useLayoutEffect(() => {
    const video = videoRef.current;
    const { videoLink, backgroundImage } = movie;
    if (video !== null) {
      video.src = videoLink;
      video.poster = backgroundImage;

      video.onloadedmetadata = () => changeDuration(video.duration);

      video.ontimeupdate = () => setTime(Math.floor(video.currentTime));

      // componentWillUnmount
      return () => {
        video.src = ``;
        video.poster = ``;
        video.onloadedmetadata = null;
        video.ontimeupdate = null;
      };
    }
    return () => null;
  }, [movie]);

  // componentDidUpdate
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (video !== null) {
      const playPromise = video.play();
      if (isPlaying && playPromise !== undefined) {
        playPromise.then(() => console.log("video played auto"));
      } else {
        video.pause();
      }
    }
  });

  const onFullscreenClickHandler = () => {
    if (videoRef.current !== null) {
      videoRef.current.requestFullscreen();
    }
  };

  const onExitButtonClickHandler = () => {
    history.goBack();
  };

  const onButtonClickHandler = () => {
    setPlayStatus(!isPlaying);
  };

  const getTimeLeft = () => {
    const timeLeft = duration - currentTime;

    const formatTime = (time: number) => {
      return time < 10 ? `0${time}` : time;
    };

    const minutes = formatTime(Math.floor(timeLeft / TIME_IN_SECONDS.MINUTE));
    const seconds = formatTime(Math.floor(timeLeft % TIME_IN_SECONDS.MINUTE));
    const hours = formatTime(Math.floor(timeLeft / TIME_IN_SECONDS.HOUR));

    return hours > 1
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  const renderPlayButton = () => {
    return (
      <button
        onClick={onButtonClickHandler}
        type="button"
        className="player__play"
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
    );
  };

  const renderPauseButton = () => {
    return (
      <button
        onClick={onButtonClickHandler}
        type="button"
        className="player__play"
      >
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause" />
        </svg>
        <span>Pause</span>
      </button>
    );
  };

  const renderFullscreenButton = () => {
    return (
      <button
        onClick={onFullscreenClickHandler}
        type="button"
        className="player__full-screen"
      >
        <svg viewBox="0 0 27 27" width="27" height="27">
          <use xlinkHref="#full-screen" />
        </svg>
        <span>Full screen</span>
      </button>
    );
  };

  return (
    <div className="player">
      <video ref={videoRef} className="player__video" />

      <button
        onClick={onExitButtonClickHandler}
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
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>

        <div className="player__controls-row">
          {isPlaying ? renderPauseButton() : renderPlayButton()}
          <div className="player__name">{movie.name}</div>

          {renderFullscreenButton()}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
