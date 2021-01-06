import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import { useChangeMovieFavoriteStatus } from "../../redux/data/hooks/useChangeMovieFavoriteStatus";
import { usePromoMovie } from "../../redux/data/hooks/selectors";

const MoviePromoCard = () => {
  const promoMovie = usePromoMovie();
  const changeMovieFavoriteStatus = useChangeMovieFavoriteStatus();

  const onButtonClickHandler = (movieId, isFavorite) => () => {
    changeMovieFavoriteStatus(movieId, isFavorite);
  };

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={promoMovie.posterImage}
              alt={promoMovie.name}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovie.genre}</span>
              <span className="movie-card__year">{promoMovie.released}</span>
            </p>

            <div className="movie-card__buttons">
              <Link
                to={`/player/${promoMovie.id}`}
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
                onClick={onButtonClickHandler(
                  promoMovie.id,
                  !promoMovie.isFavorite
                )}
              >
                {!promoMovie.isFavorite ? (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoviePromoCard;
