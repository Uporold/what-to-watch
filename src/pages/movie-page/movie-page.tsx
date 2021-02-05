import React from "react";
import { RouteComponentProps } from "react-router";
import MoviesList from "../../components/movies-list/movies-list";
import Footer from "../../components/footer/footer";
import MovieCardHero from "../../components/movie-card-hero/movie-card-hero";
import MoviePageInfo from "../../components/movie-page-info/movie-page-info";
import {
  useCurrentMovie,
  useAllMovies,
} from "../../redux/data/hooks/selectors";
import { Movie } from "../../utilities/types";

interface MatchParams {
  id: string;
}

type Props = RouteComponentProps<MatchParams>;

const getRelatedMovies = (movie: Movie, movies: Array<Movie>) => {
  return movies
    .filter((item) => item.genre === movie.genre && item.id !== movie.id)
    .slice(0, 4);
};

const MoviePage: React.FC<Props> = ({ match }): JSX.Element => {
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

export default MoviePage;
