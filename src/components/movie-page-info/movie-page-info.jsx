import React, { PureComponent } from "react";
import MovieNav from "../movie-nav/movie-nav";
import { movieNavs } from "../../utilities/util";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import { projectPropTypes } from "../../utilities/project-prop-types";

class MoviePageInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeNavBar: `overview`,
    };
  }

  componentDidUpdate(prevProps) {
    this.setDefaultState(prevProps);
  }

  onNavClick = (navBar) => {
    this.setState({
      activeNavBar: navBar,
    });
  };

  setDefaultState(prevProps) {
    const { movie } = this.props;
    if (movie.id !== prevProps.movie.id) {
      this.setState({ activeNavBar: `overview` });
    }
  }

  renderActiveMovieNavInfo(activeNavBar) {
    const { movie } = this.props;
    switch (activeNavBar) {
      case `overview`:
        return <MoviePageOverview movie={movie} />;

      case `details`:
        return <MoviePageDetails movie={movie} />;

      case `reviews`:
        return <MoviePageReviews movie={movie} />;

      default:
        return <MoviePageOverview movie={movie} />;
    }
  }

  render() {
    const { movie } = this.props;
    const { activeNavBar } = this.state;
    return (
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img
              src={movie.posterImage}
              alt={movie.name}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">
            <MovieNav
              tabs={movieNavs}
              currentNav={activeNavBar}
              onNavClick={this.onNavClick}
            />
            {this.renderActiveMovieNavInfo(activeNavBar)}
          </div>
        </div>
      </div>
    );
  }
}

MoviePageInfo.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MoviePageInfo;
