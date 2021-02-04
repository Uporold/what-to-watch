import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import VideoPreview from "../video-preview/video-preview";
import { Movie } from "../../utilities/types";

interface Props {
  movie: Movie;
}

const SmallMovieCard: React.FC<Props> = memo(
  ({ movie }): JSX.Element => {
    const [isPlaying, setPlayingStatus] = useState(false);
    const { id, previewVideoLink, previewImage, name } = movie;
    const onMouseMoveHandler = (status: boolean) => () => {
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
  },
);

export default SmallMovieCard;
