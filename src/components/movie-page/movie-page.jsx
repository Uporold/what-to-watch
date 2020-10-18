import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MovieNav from "../movie-nav/movie-nav";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import MoviesList from "../movies-list/movies-list";
import { movieNavs } from "../../utilities/util";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Footer from "../footer/footer";
import Header from "../header/header";
import MovieCardHero from "../movie-card-hero/movie-card-hero";

class MoviePage extends PureComponent {
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
    if (movie !== prevProps.movie) {
      this.setState({ activeNavBar: `overview` });
    }
  }

  getRelatedVideos(movie, movies) {
    return movies
      .filter((item) => item.genre === movie.genre && item.id !== movie.id)
      .slice(0, 4);
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
    const {
      backgroundImage,
      name,
      genre,
      released,
      posterImage,
      backgroundColor,
    } = this.props.movie;

    const { movies, movie } = this.props;
    const { activeNavBar } = this.state;
    return (
      <>
        <section
          className="movie-card movie-card--full"
          style={{ background: backgroundColor }}
        >
          <MovieCardHero movie={movie} />

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImage} alt={name} width="218" height="327" />
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
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesList movies={this.getRelatedVideos(movie, movies)} />
          </section>

          <Footer />
        </div>
      </>
    );
  }
}

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MoviePage;
