import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../../components/movies-list/movies-list";
import Footer from "../../components/footer/footer";
import MovieCardHero from "../../components/movie-card-hero/movie-card-hero";
import MoviePageInfo from "../../components/movie-page-info/movie-page-info";
import {
  useCurrentMovie,
  useAllMovies,
} from "../../redux/data/hooks/selectors";

const getRelatedMovies = (movie, movies) => {
  return movies
    .filter((item) => item.genre === movie.genre && item.id !== movie.id)
    .slice(0, 4);
};

const MoviePage = ({ match }) => {
  const movie = useCurrentMovie(match.params.id);
  const movies = useAllMovies();
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
          <MoviesList movies={getRelatedMovies(movie, movies)} />
        </section>

        <Footer />
      </div>
    </>
  );
};

MoviePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MoviePage;
