import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import { projectPropTypes } from "../../utilities/project-prop-types";

const MovieCardHero = ({ movie }) => {
  const { backgroundImage, name, genre, released } = movie;
  return (
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="movie-card__wrap">
        <div className="movie-card__desc">
          <h2 className="movie-card__title">{name}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{genre}</span>
            <span className="movie-card__year">{released}</span>
          </p>

          <div className="movie-card__buttons">
            <Link
              to={`/player/${movie.id}`}
              className="btn btn--play movie-card__button"
              type="button"
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </Link>
            <button className="btn btn--list movie-card__button" type="button">
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add" />
              </svg>
              <span>My list</span>
            </button>
            <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">
              Add review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieCardHero.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MovieCardHero;
