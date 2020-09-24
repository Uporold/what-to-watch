import React, { useState, PureComponent } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import VideoPreview from "../video-preview/video-preview";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const { onHover, movie } = this.props;
    const { isPlaying } = this.state;
    const { id, previewVideoLink, previewImage, name } = movie;

    return (
      <article
        key={`${id}`}
        onMouseEnter={() => {
          this.setState({
            isPlaying: true,
          });
          onHover(movie);
          console.log(`Playing`);
        }}
        onMouseOut={() => {
          this.setState({
            isPlaying: false,
          });
          console.log(`Not playing`);
        }}
        className="small-movie-card catalog__movies-card"
      >
        <Link className="small-movie-card__link" to={`/films/${movie.id}`}>
          <div className="small-movie-card__image">
            <VideoPreview
              isMuted
              source={previewVideoLink}
              poster={previewImage}
              isPlaying={isPlaying}
            />
          </div>
          <h3 className="small-movie-card__title">{name}</h3>
        </Link>
      </article>
    );
  }
}

/* function SmallMovieCard({ movie, onSmallCardMovieClick, onHover }) {
  const [isPlaying, setPlay] = useState(false);
  return (
    <>
      <article
        key={`${movie.id}`}
        onClick={(evt) => {
          evt.preventDefault();
          onSmallCardMovieClick(movie);
        }}
        onMouseEnter={() => {
          setPlay(true);
          onHover(movie);
          console.log(`Playing`);
        }}
        onMouseOut={() => {
          setPlay(false);
          console.log(`Not playing`);
        }}
        className="small-movie-card catalog__movies-card"
      >
        <div className="small-movie-card__image">
          <VideoPreview
            isMuted
            source={movie.previewVideoLink}
            posterImage={movie.previewImage}
            isPlaying={isPlaying}
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
} */

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
