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
import MoviePromoCard from "../movie-promo-card/movie-promo-card";

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
      <MoviePromoCard />
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
