import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import { projectPropTypes } from "../../utilities/project-prop-types";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCard: null,
    };
  }

  movieHoverHandler = (movie) => {
    this.setState({
      activeMovieCard: movie,
    });
    console.log(movie);
  };

  render() {
    const { movies } = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            onHover={this.movieHoverHandler}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
};

export default MoviesList;
