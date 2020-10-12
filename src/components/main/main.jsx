import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator } from "../../redux/reducer";
import MoviesList from "../movies-list/movies-list";
import Genres from "../genres/genres";
import { projectPropTypes } from "../../utilities/project-prop-types";
import { getMoviesGenres } from "../../utilities/util";
import ShowMoreButton from "../show-more-button/show-more-button";
import { DEFAULT_GENRE } from "../../utilities/const";
import Footer from "../footer/footer";

export const Main = ({
  movies,
  moviesByGenre,
  currentGenre,
  onGenreClick,
  onShowMoreButtonClick,
  showedMoviesCount,
}) => {
  const genres = getMoviesGenres(movies);
  const slicedMovies = moviesByGenre.slice(0, showedMoviesCount);
  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
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

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genres
            genres={genres}
            currentGenre={currentGenre}
            onGenreClick={onGenreClick}
          />

          <MoviesList movies={slicedMovies} />

          {(movies.length > slicedMovies.length &&
            currentGenre === DEFAULT_GENRE) ||
          (slicedMovies.length < moviesByGenre.length &&
            currentGenre !== DEFAULT_GENRE) ? (
            <ShowMoreButton onShowMoreButtonClick={onShowMoreButtonClick} />
          ) : (
            ``
          )}
        </section>

        <Footer />
      </div>
    </>
  );
};

Main.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  moviesByGenre: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired)
    .isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  showedMoviesCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  moviesByGenre: state.moviesByGenre,
  showedMoviesCount: state.showedMoviesCount,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setDefaultMoviesCount());
    dispatch(ActionCreator.getMovies(genre));
    dispatch(ActionCreator.setGenre(genre));
  },

  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
