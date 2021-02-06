import React from "react";
import Genres from "../genres/genres";
import MoviesList from "../movies-list/movies-list";
import { DEFAULT_GENRE } from "../../utilities/const";
import ShowMoreButton from "../show-more-button/show-more-button";
import {
  useAllMovies,
  useFilteredMoviesByGenre,
  useShowedMovies,
} from "../../redux/data/hooks/selectors";
import { useShowMoreMovies } from "../../redux/data/hooks/useShowMoreMovies";
import { useActiveGenre } from "../../redux/app/hooks/selectors";

const Catalog: React.FC = (): JSX.Element => {
  const movies = useAllMovies();
  const currentGenre = useActiveGenre();
  const moviesByGenre = useFilteredMoviesByGenre();
  const showedMoviesByGenre = useShowedMovies();
  const showMoreMovies = useShowMoreMovies();

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genres currentGenre={currentGenre} />

      <MoviesList movies={showedMoviesByGenre} />

      {(movies.length > showedMoviesByGenre.length &&
        currentGenre === DEFAULT_GENRE) ||
      (showedMoviesByGenre.length < moviesByGenre.length &&
        currentGenre !== DEFAULT_GENRE) ? (
        <ShowMoreButton onShowMoreButtonClick={showMoreMovies} />
      ) : (
        ``
      )}
    </section>
  );
};

export default Catalog;
