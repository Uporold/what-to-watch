import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Genres from "../genres/genres";
import MoviesList from "../movies-list/movies-list";
import { DEFAULT_GENRE } from "../../utilities/const";
import ShowMoreButton from "../show-more-button/show-more-button";
import { projectPropTypes } from "../../utilities/project-prop-types";
import {
  getAllMovies,
  getFilteredMoviesByGenre,
  getShowedMovies,
} from "../../redux/data/selectors";
import { getActiveGenre } from "../../redux/app/selectors";
import { ActionCreator as DataActionCreator } from "../../redux/data/data";

const Catalog = ({
  movies,
  moviesByGenre,
  showedMoviesByGenre,
  onShowMoreButtonClick,
  currentGenre,
}) => {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genres />

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
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  moviesByGenre: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired)
    .isRequired,
  showedMoviesByGenre: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired)
    .isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getAllMovies(state),
  moviesByGenre: getFilteredMoviesByGenre(state),
  showedMoviesByGenre: getShowedMovies(state),
  currentGenre: getActiveGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(DataActionCreator.showMoreMovies());
  },
});

export { Catalog };

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
