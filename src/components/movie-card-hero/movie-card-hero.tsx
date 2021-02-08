import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import { useAuthorizationStatus } from "../../redux/user/hooks/selectors";
import { useChangeMovieFavoriteStatus } from "../../redux/data/hooks/useChangeMovieFavoriteStatus";
import { Movie } from "../../utilities/types";

interface Props {
  movie: Movie;
}

const MovieCardHero: React.FC<Props> = ({ movie }): JSX.Element => {
  const { backgroundImage, name, genre, released } = movie;
  const authorizationStatus = useAuthorizationStatus();
  const changeMovieFavoriteStatus = useChangeMovieFavoriteStatus();

  const onButtonClickHandler = (movieId: number, isFavorite: boolean) => () => {
    changeMovieFavoriteStatus(movieId, isFavorite);
  };

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
            <button
              className="btn btn--list movie-card__button"
              type="button"
              onClick={onButtonClickHandler(movie.id, !movie.isFavorite)}
            >
              {!movie.isFavorite ? (
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add" />
                </svg>
              ) : (
                <svg viewBox="0 0 18 14" width="18" height="14">
                  <use xlinkHref="#in-list" />
                </svg>
              )}
              <span>My list</span>
            </button>
            {authorizationStatus && (
              <Link
                to={`/films/${movie.id}/review`}
                className="btn movie-card__button"
              >
                Add review
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardHero;
