import React from "react";
import PropTypes from "prop-types";
import { getActiveGenre } from "../../redux/app/selectors";
import { getAllGenres } from "../../redux/data/selectors";
import { ActionCreator as DataActionCreator } from "../../redux/data/data";
import { ActionCreator as AppActionCreator } from "../../redux/app/app";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => ({
  currentGenre: getActiveGenre(state),
  genres: getAllGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(DataActionCreator.setDefaultMoviesCount());
    dispatch(AppActionCreator.setGenre(genre));
  },
});

export { Genres };

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
