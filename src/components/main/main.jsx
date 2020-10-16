import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator as AppActionCreator } from "../../redux/app/app";
import { ActionCreator as DataActionCreator } from "../../redux/data/data";
import MoviesList from "../movies-list/movies-list";
import Genres from "../genres/genres";
import { projectPropTypes } from "../../utilities/project-prop-types";
import { getMoviesGenres, getMoviesByGenre } from "../../utilities/util";
import ShowMoreButton from "../show-more-button/show-more-button";
import { DEFAULT_GENRE } from "../../utilities/const";
import Footer from "../footer/footer";
import NameSpace from "../../redux/name-space";

export const Main = ({
  movies,
  currentGenre,
  onGenreClick,
  onShowMoreButtonClick,
  showedMoviesCount,
}) => {
  const genres = getMoviesGenres(movies);
  const moviesByGenre = getMoviesByGenre(movies, currentGenre);
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
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  showedMoviesCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state[NameSpace.APP].currentGenre,
  movies: state[NameSpace.DATA].movies,
  showedMoviesCount: state[NameSpace.DATA].showedMoviesCount,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(DataActionCreator.setDefaultMoviesCount());
    dispatch(AppActionCreator.setGenre(genre));
  },

  onShowMoreButtonClick() {
    dispatch(DataActionCreator.showMoreMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
