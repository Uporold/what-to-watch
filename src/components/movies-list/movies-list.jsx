import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {projectPropTypes} from "../../utilities/project-prop-types";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };

    // this.movieHoverHandler = this.movieHoverHandler.bind(this);
  }

  movieHoverHandler = (movie) => {
    this.setState({
      activeMovieCard: movie,
    });
    console.log(movie);
  };

  render() {
    const { movies, onSmallCardMovieClick } = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            onSmallCardMovieClick={onSmallCardMovieClick}
            onHover={this.movieHoverHandler}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  onSmallCardMovieClick: PropTypes.func.isRequired,
};

export default MoviesList;
