import React from "react";
import { getRatingLevel } from "../../utilities/util";
import { projectPropTypes } from "../../utilities/project-prop-types";

const MoviePageOverview = ({ movie }) => {
  const { rating, scoresCount, description, director, starring } = movie;
  const ratingLevel = getRatingLevel(rating);
  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="movie-card__starring">
          <strong>Starring: {starring.join(`, `)}</strong>
        </p>
      </div>
    </>
  );
};

MoviePageOverview.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MoviePageOverview;
