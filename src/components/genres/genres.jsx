import React, { memo } from "react";
import { useSetDefaultMoviesCount } from "../../redux/data/hooks/useSetDefaultMoviesCount";
import { useSetGenre } from "../../redux/app/hooks/useSetGenre";
import { useAllGenres } from "../../redux/data/hooks/selectors";
import { useActiveGenre } from "../../redux/app/hooks/selectors";

const Genres = memo(() => {
  const genres = useAllGenres();
  const setDefaultMoviesCount = useSetDefaultMoviesCount();
  const setGenre = useSetGenre();
  const currentGenre = useActiveGenre();

  const onGenreClickHandler = (genre) => (evt) => {
    evt.preventDefault();
    setDefaultMoviesCount();
    setGenre(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${
            genre === currentGenre ? `catalog__genres-item--active` : ``
          }`}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={onGenreClickHandler(genre)}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
});

export default Genres;
