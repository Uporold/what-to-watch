import React from "react";
import { Movie } from "../../utilities/types";

const getRuntime = (runtime: number) => {
  const hours =
    Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h` : "";
  const minutes = runtime % 60 > 0 ? `${runtime % 60}m` : "";

  return `${hours} ${minutes}`;
};

interface Props {
  movie: Movie;
}

const MoviePageDetails: React.FC<Props> = ({ movie }): JSX.Element => {
  const { director, starring, runtime, genre, released } = movie;
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.join("\n")}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">
            {getRuntime(runtime)}
          </span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
};

export default MoviePageDetails;
