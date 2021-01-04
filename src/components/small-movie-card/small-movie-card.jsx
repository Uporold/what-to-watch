import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import VideoPreview from "../video-preview/video-preview";

const SmallMovieCard = memo(({ movie }) => {
  const [isPlaying, setPlayingStatus] = useState(false);
  const { id, previewVideoLink, previewImage, name } = movie;
  const onMouseMoveHandler = (status) => () => {
    setPlayingStatus(status);
  };

  return (
    <article
      key={`${id}`}
      onMouseEnter={onMouseMoveHandler(true)}
      onMouseLeave={onMouseMoveHandler(false)}
      className="small-movie-card catalog__movies-card"
    >
      <Link className="small-movie-card__link" to={`/films/${movie.id}`}>
        <div className="small-movie-card__image">
          <VideoPreview
            isMuted
            source={previewVideoLink}
            poster={previewImage}
            isPlaying={isPlaying}
          />
        </div>
        <h3 className="small-movie-card__title">{name}</h3>
      </Link>
    </article>
  );
});

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default SmallMovieCard;
