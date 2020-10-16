import React from "react";
import PropTypes from "prop-types";

const Genres = ({ genres, currentGenre, onGenreClick }) => {
  const onGenreClickHandler = (genre) => (evt) => {
    evt.preventDefault();
    onGenreClick(genre);
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
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default Genres;