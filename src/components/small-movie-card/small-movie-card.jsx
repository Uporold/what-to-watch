import React, { PureComponent } from "react";
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

  onMouseMoveHandler = (isPlaying) => () => {
    this.setState({
      isPlaying,
    });
  };

  render() {
    const { movie } = this.props;
    const { isPlaying } = this.state;
    const { id, previewVideoLink, previewImage, name } = movie;

    return (
      <article
        key={`${id}`}
        onMouseEnter={this.onMouseMoveHandler(true)}
        onMouseLeave={this.onMouseMoveHandler(false)}
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

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default SmallMovieCard;
