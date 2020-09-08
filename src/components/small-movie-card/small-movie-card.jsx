import React from "react";
import PropTypes from "prop-types";

function SmallMovieCard({ movie, onSmallCardMovieClick, onHover }) {
  return (
    <>
      <article
        key={`${movie.id}`}
        onClick={(evt) => {
          evt.preventDefault();
          onSmallCardMovieClick(movie);
        }}
        onMouseEnter={onHover}
        className="small-movie-card catalog__movies-card"
      >
        <div className="small-movie-card__image">
          <img
            src={movie.previewImage}
            alt={movie.name}
            width="280"
            height="175"
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">
            {movie.name}
          </a>
        </h3>
      </article>
    </>
  );
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onSmallCardMovieClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
