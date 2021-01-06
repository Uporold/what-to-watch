import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSetDefaultMoviesCount } from "../../redux/data/hooks/useSetDefaultMoviesCount";
import { useSetGenre } from "../../redux/app/hooks/useSetGenre";
import { useAllGenres } from "../../redux/data/hooks/selectors";

const Genres = memo(({ currentGenre }) => {
  const genres = useAllGenres();
  const setDefaultMoviesCount = useSetDefaultMoviesCount();
  const setGenre = useSetGenre();
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

Genres.propTypes = {
  currentGenre: PropTypes.string.isRequired,
};

export default Genres;
