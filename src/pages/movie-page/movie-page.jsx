import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MoviesList from "../../components/movies-list/movies-list";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Footer from "../../components/footer/footer";
import MovieCardHero from "../../components/movie-card-hero/movie-card-hero";
import { getAllMovies, getCurrentMovie } from "../../redux/data/selectors";
import MoviePageInfo from "../../components/movie-page-info/movie-page-info";

const getRelatedVideos = (movie, movies) => {
  return movies
    .filter((item) => item.genre === movie.genre && item.id !== movie.id)
    .slice(0, 4);
};

const MoviePage = ({ movie, movies }) => {
  return (
    <>
      <section
        className="movie-card movie-card--full"
        style={{ background: movie.backgroundColor }}
      >
        <MovieCardHero movie={movie} />
        <MoviePageInfo movie={movie} />
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList movies={getRelatedVideos(movie, movies)} />
        </section>

        <Footer />
      </div>
    </>
  );
};

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  movie: projectPropTypes.MOVIE.isRequired,
};

const mapStateToProps = (state, { match: { params } }) => ({
  movie: getCurrentMovie(params.id)(state),
  movies: getAllMovies(state),
});

export { MoviePage };

export default connect(mapStateToProps)(MoviePage);
