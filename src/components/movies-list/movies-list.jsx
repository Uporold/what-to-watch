import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };
  }

  render() {
    const { movies, onSmallCardMovieClick } = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            onSmallCardMovieClick={onSmallCardMovieClick}
            onHover={() => {
              this.setState({ activeMovieCard: movie });
              console.log(movie);
            }}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onSmallCardMovieClick: PropTypes.func.isRequired,
};

export default MoviesList;
