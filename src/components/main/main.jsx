import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator as AppActionCreator } from "../../redux/app/app";
import { ActionCreator as DataActionCreator } from "../../redux/data/data";
import MoviesList from "../movies-list/movies-list";
import Genres from "../genres/genres";
import { projectPropTypes } from "../../utilities/project-prop-types";
import ShowMoreButton from "../show-more-button/show-more-button";
import { DEFAULT_GENRE } from "../../utilities/const";
import Footer from "../footer/footer";
import MoviePromoCard from "../movie-promo-card/movie-promo-card";
import {
  getAllGenres,
  getAllMovies,
  getShowedMovies,
  getFilteredMoviesByGenre,
} from "../../redux/data/selectors";
import { getActiveGenre } from "../../redux/app/selectors";

export const Main = ({
  movies,
  moviesByGenre,
  showedMoviesByGenre,
  currentGenre,
  genres,
  onGenreClick,
  onShowMoreButtonClick,
}) => {
  return (
    <>
      <MoviePromoCard />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genres
            genres={genres}
            currentGenre={currentGenre}
            onGenreClick={onGenreClick}
          />

          <MoviesList movies={showedMoviesByGenre} />

          {(movies.length > showedMoviesByGenre.length &&
            currentGenre === DEFAULT_GENRE) ||
          (showedMoviesByGenre.length < moviesByGenre.length &&
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
  showedMoviesByGenre: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired)
    .isRequired,
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getActiveGenre(state),
  genres: getAllGenres(state),
  movies: getAllMovies(state),
  moviesByGenre: getFilteredMoviesByGenre(state),
  showedMoviesByGenre: getShowedMovies(state),
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
