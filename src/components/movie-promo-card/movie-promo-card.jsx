import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../header/header";
import { getPromoMovie } from "../../redux/data/selectors";
import { projectPropTypes } from "../../utilities/project-prop-types";

const MoviePromoCard = ({ promoMovie }) => {
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
              >
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add" />
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MoviePromoCard.propTypes = {
  promoMovie: projectPropTypes.MOVIE.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
});

export { MoviePromoCard };
export default connect(mapStateToProps)(MoviePromoCard);
